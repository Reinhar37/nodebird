const Post = require('../models/post');
const Hashtag = require('../models/hashtag');


exports.uploadPost = async (content, url, id) => {

  const post = await Post.create({
    content: content,
    img: url,
    UserId: id,
  });
  const hashtags = content.match(/#[^\s#]*/g); //해시태그(#) 정규표현식
  if(hashtags) {
    const result = await Promise.all(hashtags.map((tag) => {
      return Hashtag.findOrCreate({
        where: { title: tag.slice(1).toLowerCase() }
      });
    }));
    await post.addHashtags(result.map(r => r[0]));
    return 'hashtag ok';
  }
  return 'ok';

}

exports.deletePost = async (post) => {

  Post.destroy({ where: { id: post } });
  return 'ok';

}