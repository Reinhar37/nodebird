const express = require('express');
const router = express.Router();
const { renderJoin, renderMain, renderProfile, renderHashtag, renderNick } = require('../controllers/page');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers.length || 0;
  res.locals.followingCount = req.user?.Followings.length || 0;
  res.locals.followingIdList = req.user?.Followings.map(f => f.id) || [];
  res.locals.likeIdListList = req.user?.likeMe.map(c => c.id) || [];
  next();
});

router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag); // hashtag?hashtag=123
router.get('/nick', renderNick);


module.exports = router;
