const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');
const { renderMain, renderHashtag, renderNick } = require('../services/page');

exports.renderProfile = (req, res, next) => {
  //서비스를 호출
  res.render('profile', { title: '내 정보 - NodeBird' });
}

exports.renderJoin = (req, res, next) => {
  res.render('join', { title: '회원 가입 - NodeBird' });
}

// exports.renderMain = async (req, res, next) => {
//   try {
//     const posts = await Post.findAll({
//       include: {
//         model: User,
//         attributes: ['id', 'nick'],
//       },
//       order: [['createdAt', 'DESC'],]
//     });
//     res.render('main', {
//       title: 'NodeBird',
//       twits: posts,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// 라우터 -> 컨트롤러 -> 서비스(요청, 응답 모른다)

// exports.renderHashtag = async (req, res, next) => {
//   try {
//     const query = req.query.hashtag;
//     if(!query) {
//       return res.redirect('/');
//     }
//     const hashtag = await Hashtag.findOne({ where: {title: query }});
//     let posts = [];
//     if(hashtag) {
//       posts = await hashtag.getPosts({
//         include: [{ model: User, attributes: ['id', 'nick' ]}],
//         order: [['createdAt', 'DESC']]
//       });
//     }
//     res.render('main', {
//       title: `${query} | NodeBird`,
//       twits: posts,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.renderNick = async (req, res, next) => {
//   try {
//     const query = req.query.nick;
//     if(!query) {
//       return res.redirect('/');
//     }
//     const nick = await User.findOne({ where: {nick: query }});
//     let posts = [];
//     if(nick) {
//       posts = await nick.getPosts({
//         include: [{ model: User, attributes: ['nick', 'nick' ]}],
//         order: [['createdAt', 'DESC']]
//       });
//     }
//     res.render('main', {
//       title: `${query} | NodeBird`,
//       twits: posts,
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

//서비스 사용

exports.renderMain = async (req, res, next) => {
  try {
    const posts = await renderMain();
    res.render('main', {
      title: 'NodeBird',
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.renderHashtag = async (req, res, next) => {
  try {
    const posts = await renderHashtag(req.query.hashtag);
    if(posts === 'no hashtag'){
      return res.redirect('/');
    }
    res.render('main', {
      title: `${req.query.hashtag} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.renderNick = async (req, res, next) => {
  try {
    const posts = await renderNick(req.query.nick);
    if(posts === 'no nick'){
      return res.redirect('/');
    }
    res.render('main', {
      title: `${req.query.nick} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
}