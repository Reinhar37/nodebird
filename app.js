const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const RedisStore = require('connect-redis').default; 
const { sequelize } = require('./models');

//process.env.COOKIE_SECRET 없음 
dotenv.config(); //process.env
//process.env.COOKIE_SECRET 있음
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
  legacyMode: true,
})
redisClient.connect().catch(console.error);
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false }) //true이면 서버재시작시 데이터가 초기화된다
  .then(() => {
    console
    .log('데이터베이스 연결 성공');
  });

if(process.env.NODE_ENV === 'production') {
  app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
  }));
  app.use(hpp());
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json()); // req.body를 ajax json 요청으로부터
app.use(express.urlencoded({ extended: false })); //req.body 폼으로부터
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true, //자바스크립트에서 접근 못하도록
    secure: false,
  },
  store: new RedisStore({ client: redisClient }),
}));

//passport는 session밑에 넣는다
app.use(passport.initialize());  //req.user, req.login, req.isAuthenticate, req.logout
app.use(passport.session()); //connect.sid라는 이름으로 세션 쿠키가 브라우저로 전송

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; //에러 로그를 서비스한테 넘겨요
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
