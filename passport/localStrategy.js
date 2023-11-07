const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email', // req.body.email
    passwordField: 'password', //req.body.password
    passReqToCallback: false
  }, async (email, password, done) => { // done(서버 실패, 성공유저, 로직실패)
    const exUser = await User.findOne({ where: { email }});
    try {
      if(exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if(result){
          done(null, exUser); //값이 있으므로 성공유저
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); //서버에 문제는없지만 로직에 문제가있으므로 로직실패
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' }); //서버에 문제는없지만 로직에 문제가있으므로 로직실패
      }
    } catch (error) {
      console.error(error);
      done(error); //서버에 문제가있는 에러가 발생해서 서버실패
    }
  }));
}