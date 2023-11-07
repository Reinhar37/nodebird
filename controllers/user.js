const User = require('../models/user');
const { follow, unFollow, like, unLike, updateProfile } = require('../services/user');

// exports.follow = async (req, res, next) => { //service 사용 전
//   // req.user.id, req.params.id

//   try {
//     const user = await User.findOne({ where: { id: req.user.id }});
//     console.log('user', user);
//     if(user) {
//       await user.addFollowing(parseInt(req.params.id, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.unFollow = async (req, res, next) => {

//   try {
//     const user = await User.findOne({ where: { id: req.user.id }});
//     if(user) {
//       await user.removeFollowing(parseInt(req.params.id, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.like = async (req, res, next) => {

//   try {
//     const user = await User.findOne({ where: { id: req.user.id }});
//     if(user) {
//       await user.addLikeMe(parseInt(req.params.post, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.unLike = async (req, res, next) => {

//   try {
//     const user = await User.findOne({ where: { id: req.user.id }});
//     if(user) {
//       await user.removeLikeMe(parseInt(req.params.post, 10));
//       res.send('success');
//     } else {
//       res.status(404).send('no user');
//     }
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// }

// exports.updateProfile = async (req, res, next) => {
//   try {
//     const result = await User.update({
//       nick: req.body.nick,
//     }, {
//       where: { id: req.params.id },
//     });
//     res.json(result);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// }

//service 사용

exports.follow = async (req, res, next) => { 

  try {
    const result = await follow(req.user.id, req.params.id);
    if(result === 'ok') {
      res.send('success');
    } else if(result === 'no user'){
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.unFollow = async (req, res, next) => { 

  try {
    const result = await unFollow(req.user.id, req.params.id);
    if(result === 'ok') {
      res.send('success');
    } else if(result === 'no user'){
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.like = async (req, res, next) => { 

  try {
    const result = await like(req.user.id, req.params.post);
    if(result === 'ok') {
      res.send('success');
    } else if(result === 'no user'){
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.unLike = async (req, res, next) => { 

  try {
    const result = await unLike(req.user.id, req.params.post);
    if(result === 'ok') {
      res.send('success');
    } else if(result === 'no user'){
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}

exports.updateProfile = async (req, res, next) => { 

  try {
    const result = await updateProfile(req.user.id, req.body.nick);
    if(result === 'ok') {
      res.send('success');
    } else if(result === 'no user'){
      res.status(404).send('no user');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
}