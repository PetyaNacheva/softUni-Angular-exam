const router = require('express').Router();
const users = require('./users');
const photos = require('./photos')
const posts = require('./posts');
const likes = require('./likes');
const test = require('./test');
const offers = require('./offers')

const { authController } = require('../controllers');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.use('/users', users);

router.use('/photos', photos);
router.use('/offers', offers);
router.use('/posts', posts);
router.use('/likes', likes);
router.use('/test', test);

module.exports = router;
