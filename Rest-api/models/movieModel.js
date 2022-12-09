const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
    },
    director: {
        type: String,
        required: [true, 'Director is required'],
        unique: false,
    },
    genre: {
        type: String,
        required: true,
    },
    releaseDate:{
        type: String,
        required: true,
    },
    poster: {
        type: String,

    },
  
    actors: [{
        type: String,
        required: true
    }],
    shortStory: {
        type: String,
        required: true
    },
    likes: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment'
    }],
    
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Movie', movieSchema);

// module.exports = mongoose.model('Movie', movieSchema);
