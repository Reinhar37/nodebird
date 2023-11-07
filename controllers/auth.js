const User = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { join, login } = require('../services/auth');

// exports.join = async (req, res, next) => {
//   const { nick, email, password } = req.body;

//   try {
//     const exUser = await User.findOne({ where: { email } });
//     if(exUser){
//       return res.redirect('/join?error=exist');
//     }
//     const hash = await bcrypt.hash(password, 12);
//     await User.create({
//       email,
//       nick,
//       password: hash,
//     });
//     return res.redirect('/'); //302
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => { // localStrategy.js의 done
    if(authError) { //서버실패
      console.error(authError);
      return next(authError);
    }
    if(!user) { //로직실패
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => { //로그인 성공 passport에있는 index.js의 passport.serializeUSer 호출
      if (loginError) {
        console.error(loginError);
        return newt(loginError);
      }
      return res.redirect('/');
    });
  }) (req, res, next);
}

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
}

//services 사용

exports.join = async (req, res, next) => {
  const { nick, email, password } = req.body;

  try {
    const exUser = await join(nick, email, password);
    if(exUser === 'error'){
      return res.redirect('/join?error=exist');
    }
    return res.redirect('/'); //302
  } catch (error) {
    console.error(error);
    next(error);
  }
}
