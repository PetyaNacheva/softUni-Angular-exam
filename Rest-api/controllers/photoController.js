const { photoModel, userModel} = require('../models');
const { newPost } = require('./postController')

function getPhotos(req, res, next) {
    const title = req.query.title || '';
    photoModel.find({photoTitle: {$regex: title, $options: 'i'}})
        .populate('userId')
        .then(photos => res.json(photos))
        .catch(next);
}

function getPhotosList(req, res, next){
    const title = req.query.title || '';
    const startIndex = +req.query.startIndex || 0;
    const limit = +req.query.limit || Number.MAX_SAFE_INTEGER;

    Promise.all([
        photoModel.find({photoTitle: {$regex: title, $options: 'i'}})
            .skip(startIndex)
            .limit(limit)
            .populate('userId'),
            photoModel.find({photoTitle: {$regex: title, $options: 'i'}}).countDocuments()
    ])
        .then(([results, totalResults]) => res.json({results, totalResults})).catch(next)
}

function getTopPhotos(req, res, next){    
    photoModel.find().sort({"subscribers": -1}).limit(6).populate('userId')
    .then(photos => res.json(photos))
    .catch(next);

}

function getPhoto(req, res, next) {
    const { photoId } = req.params;

    photoModel.findById(photoId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(photo => res.json(photo))
        .catch(next);
}

function createPhoto(req, res, next) {
    const { photoTitle, photoUrl, photoExif, photoGenre } = req.body;
    const { _id: userId } = req.user;

    photoModel.create({ photoTitle, photoUrl, photoGenre, photoExif, userId })
        .then(photo =>  res.json(photo))
        .catch(next);
}

function subscribe(req, res, next) {
    const photoId = req.params.photoId;
    const { _id: userId } = req.user;
    photoModel.findByIdAndUpdate({ _id: photoId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedPhoto => {
            res.status(200).json(updatedPhoto)
        })
        .catch(next);
}

function unsubscribe(req, res, next) {
    const photoId = req.params.photoId;
    const { _id: userId } = req.user;
    photoModel.findByIdAndUpdate({ _id: photoId }, { $pull: { subscribers: userId } }, { new: true })
        .then(updatedPhoto => {
            res.status(200).json(updatedPhoto)
        })
        .catch(next);
}

function deletePhoto(req, res, next){
    const { photoId } = req.params;
    const { _id: userId } = req.user;
    
        Promise.all([
            photoModel.findOneAndDelete({ _id: photoId}),
            userModel.findOneAndUpdate({ _id: userId }, { $pull: { photos: photoId } }),
        ])
            .then(([deletedOne, _, __]) => {
                if (deletedOne) {
                    res.status(200).json(deletedOne)
                } else {
                    res.status(401).json({ message: `Not allowed!` });
                }
            })
            .catch(next);
}

module.exports = {
    subscribe,
    getPhotos,
    createPhoto,
    getPhoto,
    unsubscribe,
    deletePhoto,
    getTopPhotos,
    getPhotosList
}
