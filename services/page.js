const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');

exports.renderMain = async () => {
  
  return await Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick'],
    },
    order: [['createdAt', 'DESC'],]
  });

}

exports.renderHashtag = async (hashtagQuery) => {
  
  const query = hashtagQuery;
  if(!query) {
    return 'no hashtag';
  }
  const hashtag = await Hashtag.findOne({ where: {title: query }});
  let posts = [];
  if(hashtag) {
    posts = await hashtag.getPosts({
      include: [{ model: User, attributes: ['id', 'nick' ]}],
      order: [['createdAt', 'DESC']]
    });
  }
  return posts;
}

exports.renderNick = async (nickQuery) => {

  const query = nickQuery;
  if(!query) {
    return 'no nick';
  }
  const nick = await User.findOne({ where: {nick: query }});
  let posts = [];
  if(nick) {
    posts = await nick.getPosts({
      include: [{ model: User, attributes: ['nick', 'nick' ]}],
      order: [['createdAt', 'DESC']]
    });
  }
  return posts;
}