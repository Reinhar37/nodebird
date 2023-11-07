const Post = require('../models/post');
const Hashtag = require('../models/hashtag');
const { uploadPost, deletePost } = require('../services/post');

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
}

// exports.uploadPost = async (req, res, next) => {
//   // req.body.content, req.body,url

//   try {
//     const post = await Post.create({
//       content: req.body.content,
//       img: req.body.url,
//       UserId: req.user.id,
//     });
//     const hashtags = req.body.content.match(/#[^\s#]*/g); //해시태그(#) 정규표현식
//     if(hashtags) {
//       const result = await Promise.all(hashtags.map((tag) => {
//         return Hashtag.findOrCreate({
//           where: { title: tag.slice(1).toLowerCase() }
//         });
//       }));
//       console.log('result', result);
//       await post.addHashtags(result.map(r => r[0]));
//     }
//     res.redirect('/');
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// }

// exports.deletePost = async (req, res, next) => {
//   try {
//     await Post.destroy({ where: { id: req.params.post } });
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
// }

//services 사용

exports.uploadPost = async (req, res, next) => {
  // req.body.content, req.body,url

  try {
    await uploadPost(req.body.content, req.body.url, req.user.id);
    res.redirect('/');
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    await deletePost(req.params.post);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
}