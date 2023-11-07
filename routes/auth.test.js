const app = require('../app');
const request = require('supertest');
const { sequelize } = require('../models');

beforeAll(async () => { //모든테스트가 실행되기전 한번만 실행
  await sequelize.sync({ force: true }); //DB와 연결
});

//beforeEach(() => {}); //각각의 테스트가 실행되기전 실행

describe('POST /join', () => { 
  test('로그인 안 했으면 가입', (done) => {
    request(app)
      .post('/auth/join')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        nick: '123',
        password: '123',
      })
      .expect('Location', '/')
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });

  test('회원가입 이미 했는데 또 하는 경우', (done) => {
    request(app).post('/auth/join')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        nick: '123',
        password: '123',
      })
      .expect('Location', '/join?error=exist')
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });

  const agent = request.agent(app);
  // request(app)이 로그인할때와 테스트할때가 다를수 있다.
  // 그 전에 위에처럼 변수로 만들어서 같은걸로 사용한다

  beforeEach((done) => { //테스트 전 로그인
    agent
      .post('/auth/login')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        password: '123',
      })
      .end(done);
  });

  test('로그인했으면 회원가입 진행이 안 되어야 함', (done) => {
    const message = encodeURIComponent('로그인한 상태입니다.');
    agent.post('/auth/join')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        nick: '123',
        password: '123',
      })
      .expect('Location', `/?error=${message}`)
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });
  
});

describe('POST /login', () => { 
  test('로그인 수행', (done) => {
    request(app).post('/auth/login')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        password: '123',
      })
      .expect('Location', '/')
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });

  test('가입되지 않은 회원', (done) => {
    const message = encodeURIComponent('가입되지 않은 회원입니다.');
    request(app).post('/auth/login')
      .send({ //req.body send에 넣어서 보낸다
        email: '1231@naver.com',
        password: '123',
      })
      .expect('Location', `/?loginError=${message}`)
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });

  test('비밀번호 틀림', (done) => {
    const message = encodeURIComponent('비밀번호가 일치하지 않습니다.');
    request(app).post('/auth/login')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        password: '1234',
      })
      .expect('Location', `/?loginError=${message}`)
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });
});

describe('GET /logout', () => {

  test('로그인되어 있지 않으면 403', (done) => {
    request(app)
      .get('/auth/logout')
      .expect(403, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });

  const agent = request.agent(app);
  // request(app)이 로그인할때와 테스트할때가 다를수 있다.
  // 그 전에 위에처럼 변수로 만들어서 같은걸로 사용한다

  beforeEach((done) => { //테스트 전 로그인
    agent
      .post('/auth/login')
      .send({ //req.body send에 넣어서 보낸다
        email: '123@naver.com',
        password: '123',
      })
      .end(done);
  });

  test('로그아웃 수행', (done) => {
    agent
      .get('/auth/logout')
      .expect('Location', `/`)
      .expect(302, done);
      //비동기인데 프로미스함수가아닌경우 여기에서 done을 넣어줘야 jest가 끝나는지 안다.
  });
});

//afterEach(() => {}); //각각의 테스트가 실행된 후 실행

afterAll(async() => {
  await sequelize.sync({ force: true }); //DB와 연결, db테이블 초기화
}); //모든테스트가 실행된 후 한번만 실행