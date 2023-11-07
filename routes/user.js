const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middlewares');
const { follow, unFollow, like, unLike, updateProfile } = require('../controllers/user');

router.post('/:id/follow', isLoggedIn, follow);
router.post('/:id/unFollow', isLoggedIn, unFollow);
router.post('/:post/like', isLoggedIn, like);
router.post('/:post/unLike', isLoggedIn, unLike);
router.patch('/:id/updateProfile', isLoggedIn, updateProfile);

module.exports = router;
