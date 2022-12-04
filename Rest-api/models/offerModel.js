const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const offerSchema = new mongoose.Schema({
    offerName: {
        type: String,
        required: true
    },
    buyOrSell: {
        type: String,
        required: true
    },
    cameraOrLens: {
        type: String,
        required: true
    },
    offerPhoto: {
        type: String,

    },
    offerDescription: {
        type: String,
    },
    offerContact: {
        type: String,
        required: true
    },
    interested: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Offer', offerSchema);
