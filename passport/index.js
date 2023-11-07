const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');
const Post = require('../models/post');

module.exports = () => {
  passport.serializeUser((user, done) => { //user === exUser
    done(null, user.id); //user id만 추출
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followers',
        },// 팔로잉
        {
          model: User,
          attributes: ['id', 'nick'],
          as: 'Followings',
        }, //팔로워
        {
          model: Post,
          attributes: ['id'],
          as: 'likeMe',
        }, //좋아요
      ]
    })
      .then((user) => done(null, user)) //req.user, req.session
      .catch(err => done(err));
  });

  local();
  kakao();
}