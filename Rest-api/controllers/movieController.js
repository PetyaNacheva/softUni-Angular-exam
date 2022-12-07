const { movieModel, userModel} = require('../models');
const { uploadFile } = require('../utils/disk');
// const { newPost } = require('./postController')

function getMovies(req, res, next) {
    const title = req.query.title || '';
    movieModel.find({title: {$regex: title, $options: 'i'}})
        .populate('userId')
        .then(movies => res.json(movies))
        .catch(next);
}


function getMovie(req, res, next) {
    const { movieId } = req.params;

    movieModel.findById(movieId)
        .populate({
            path : 'comments',
            populate : {
              path : 'userId'
            }
          })
        .then(movie => res.json(movie))
        .catch(next);
}

function createMovie(req, res, next) {
    const { title, director, genre, releaseDate, poster, actors, shortStory, likes } = req.body;
    const { _id: userId } = req.user;

    //const offerPhoto = req.files.offerPhoto;
    if(poster){
        uploadFile(poster).then(id => {
            // console.log(`This is the id ${id}`)
            const poster = `https://drive.google.com/uc?id=${id}` 
        return  movieModel.create({ title, director, genre, releaseDate, poster, actors, shortStory, likes, userId })
        .then(movie =>  res.json(movie))
        .catch(next);
        
        })
    } else {
        movieModel.create({ title, director, genre, releaseDate, actors, shortStory, likes, userId })
        .then(movie =>  res.json(movie))
        .catch(next);
    }




}
function getMoviesByLikes(req, res, next) {
    movieModel.find()
        .sort({ 'likes.length': -1 })
        .limit(3)
        .populate({
            path: 'userId',
            
        })
        .then(movies => res.json(movies))
        .catch(next);
}

function getMoviesByComments(req, res, next) {
    movieModel.find()
        .sort({ 'comments.length': -1 })
        .limit(3)
        .populate({
            path: 'userId',
           
        })
        .then(movies => res.json(movies))
        .catch(next);
}
function getAllMoviesByUser(req, res, next) {
    const { userId } = req.params;

    movieModel.find({ userId })
        .then(movies => res.json(movies))
        .catch(next);
}

function getAllLikedMoviesByUser(req, res, next) {
    const { userId } = req.params;

    movieModel.find({ likes: userId })
        .then(movies => res.json(movies))
        .catch(next);
}

function getCommentsOfMovie(req, res, next) {
    const { movieId } = req.params;

    movieModel.find(movieId)
        .populate({
            path: 'comments',
            select: ['likes', 'text', 'userId', 'created_at'],
            populate: { path: 'userId', select: 'username' }
        })
        .then(movie => res.json(movie))
        .catch(next);
}

function likeMovie(req, res, next) {
    const movieId = req.params.movieId;
    const { _id: userId } = req.user;
    movieModel.findByIdAndUpdate({ _id: movieId, userId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedMovie => {
            res.status(200).json(updatedMovie);
        })
        .catch(next);
}

function dislikeMovie(req, res, next) {
    const movieId = req.params.movieId;
    const { _id: userId } = req.user;

    movieModel.findByIdAndUpdate({ _id: movieId, userId }, { $pull: { likes: userId } }, { new: true })
        .then(updatedMovie => {
            res.status(200).json(updatedMovie);
        })
        .catch(next);
}

function editMovie(req, res, next) {
    const { movieId } = req.params;
    const { title, director, genre, releaseDate, poster, actors, shortStory, likes, userId } = req.body;

    movieModel.findOneAndUpdate({ _id: movieId }, {
        title, director, genre, releaseDate, poster, actors, shortStory, 
    }, { runValidators: true, new: true })
        .then(updatedMovie => {
            if (updatedMovie) {
                res.status(200).json(updatedMovie);
            }
            else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function deleteMovie(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        movieModel.findOneAndDelete({ _id: movieId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { movies: movieId } }),
        commentModel.deleteMany({ movieId: movieId }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne);
            } else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}



module.exports = {
    getMovie,
    getMovies,
    createMovie,
    deleteMovie,
    getMoviesByLikes,
    editMovie,
    dislikeMovie,
    likeMovie,
    getCommentsOfMovie,
    getAllLikedMoviesByUser,
    getAllMoviesByUser,
    getMoviesByComments
}
