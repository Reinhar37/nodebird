const User = require('../models/user');

exports.follow = async (userId, followingId) => {

  const user = await User.findOne({ where: { id: userId }});
  if(user) {
    await user.addFollowing(parseInt(followingId, 10));
    return 'ok';
  } else {
    return 'no user';
  }

}

exports.unFollow = async (userId, followingId) => {

  const user = await User.findOne({ where: { id: userId }});
  if(user) {
    await user.removeFollowing(parseInt(followingId, 10));
    return 'ok';
  } else {
    return 'no user';
  }

}

exports.like = async (userId, post) => {

  const user = await User.findOne({ where: { id: userId }});
  if(user) {
    await user.addLikeMe(parseInt(post, 10));
    return 'ok';
  } else {
    return 'no user';
  }

}

exports.unLike = async (userId, post) => {

  const user = await User.findOne({ where: { id: userId }});
  if(user) {
    await user.removeLikeMe(parseInt(post, 10));
    return 'ok';
  } else {
    return 'no user';
  }

}

exports.updateProfile = async (userId, nick) => {

  const user = await User.findOne({ where: { id: userId }});
  if(user) {
    await user.update({
      nick: nick,
    });
    return 'ok';
  } else {
    return 'no user';
  }

}
