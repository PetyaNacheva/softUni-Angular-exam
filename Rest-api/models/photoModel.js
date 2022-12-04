const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const photoSchema = new mongoose.Schema({
    photoTitle: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
    photoExif: {
        type: String,
    },
    photoGenre: {
        type: String,
        required: true
    },
    subscribers: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Photo', photoSchema);
