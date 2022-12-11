const express = require('express');
const router = express.Router();
const { authController, movieController } = require('../controllers');
const { auth } = require('../utils');

// router.get('/profile', auth(),authController.getProfileInfo);
// router.put('/profile', auth(), formidableMiddleware() , authController.editProfileInfo);

router.get('/profile', auth(), authController.getProfileInfo);
router.put('/profile', auth(), authController.editProfileInfo);
router.get('/profile/:userId', auth(), movieController.getAllMoviesByUser);
router.get('/profile/:userId/liked', auth(), movieController.getAllLikedMoviesByUser);

module.exports = router