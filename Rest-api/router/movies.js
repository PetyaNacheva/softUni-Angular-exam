const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { movieController, commentController } = require('../controllers');


router.get('/', movieController.getMovies);
router.post('/', auth(), movieController.createMovie);
router.get('/likes', movieController.getMoviesByLikes);
router.get('/comments', movieController.getMoviesByComments);

router.get('/:movieId', movieController.getMovie);
router.post('/:movieId', auth(), commentController.createComment);
router.put('/:movieId/like', auth(), movieController.likeMovie);
router.put('/:movieId/dislike', auth(), movieController.dislikeMovie);

router.put('/:movieId/edit', auth(), movieController.editMovie);
router.delete('/:movieId', auth(), movieController.deleteMovie);

router.get('/:movieId/comments', movieController.getCommentsOfMovie);
router.post('/:movieId/comments/:commentId/like', auth(), commentController.likeComment);
router.post('/:movieId/comments/:commentId/dislike', auth(), commentController.dislikeComment);
// router.put('/:recipeId/comments/:commentId', auth(), commentController.editComment);
// router.delete('/:recipeId/comments/:commentId', auth(), commentController.deleteComment);

module.exports = router;