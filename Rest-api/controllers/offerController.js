const { photoModel, userModel, offerModel} = require('../models');
const { uploadFile } = require('../utils/disk');
const { newPost } = require('./postController')

function getOffers(req, res, next) {
    const title = req.query.title || '';
    offerModel.find({offerName: {$regex: title, $options: 'i'}})
        .populate('userId')
        .then(offers => res.json(offers))
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


function getOffer(req, res, next) {
    const { offerId } = req.params;

    offerModel.findById(offerId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(offer => res.json(offer))
        .catch(next);
}

function createOffer(req, res, next) {
    const { offerName, buyOrSell, cameraOrLens, offerDescription, offerPhoto, offerContact } = req.body;
    const { _id: userId } = req.user;

    //const offerPhoto = req.files.offerPhoto;
    if(offerPhoto){
        uploadFile(offerPhoto).then(id => {
            console.log(`This is the id ${id}`)
            const offerPhoto = `https://drive.google.com/uc?id=${id}` 
        return  offerModel.create({ offerName, buyOrSell, cameraOrLens, offerPhoto, offerDescription, offerContact, userId })
        .then(offer =>  res.json(offer))
        .catch(next);
        
        })
    } else {
        offerModel.create({ offerName, buyOrSell, cameraOrLens, offerDescription, offerContact, userId })
        .then(offer =>  res.json(offer))
        .catch(next);
    }




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
    getOffers,
    getOffer,
    createOffer
}
