const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { photoController, postController, offerController } = require('../controllers');

// middleware that is specific to this router

router.get('/', offerController.getOffers);
router.get('/offers', offerController.getOffers);
router.post('/', auth(), offerController.createOffer);
//router.delete('/:offerId', auth(), offerController.deleteOffer);
router.get('/:offerId', offerController.getOffer);
router.post('/:offerId', auth(), postController.createPost);

router.put('/:photoId', auth(), photoController.subscribe);
router.put('/:photoId/unsubscribe', auth(), photoController.unsubscribe)
router.put('/:photoId/posts/:postId', auth(), postController.editPost);
router.delete('/:photoId/posts/:postId', auth(), postController.deletePost);


module.exports = router