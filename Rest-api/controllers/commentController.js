const { userModel, movieModel, commentModel } = require('../models');

function newComment(text, userId, recipeId) {
    return commentModel.create({ text, userId, recipeId })
        .then(comment => {
            return Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { comments: comment._id } }),
                movieModel.findByIdAndUpdate({ _id: movieId }, { $push: { comments: comment._id } }, { new: true })
            ]);
        });
}

function createComment(req, res, next) {
    const { movieId } = req.params;
    const { _id: userId } = req.user;
    const { text } = req.body;
    newComment(text, userId, movieId)
        .then(([_, updateMovie]) => res.status(200).json(updateMovie))
        .catch(next);
}

function editComment(req, res, next) {
    const { commentId } = req.params;
    const { commentText } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    commentModel.findByIdAndUpdate({ _id: commentId, userId }, { text: commentText }, { new: true })
        .then(updatedComment => {
            if (updatedComment) {
                res.status(200).json(updatedComment);
            }
            else {
                res.status(401).json({ message: 'Not allowed!' });
            }
        })
        .catch(next);
}

function deleteComment(req, res, next) {
    const { commentId, movieId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        commentModel.findByIdAndDelete({ _id: commentId, userId }),
        userModel.findByIdAndUpdate({ _id: userId }, { $pull: { comments: commentId } }),
        movieModel.findByIdAndUpdate({ _id: movieId }, { $pull: { comments: commentId } }),
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

function likeComment(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    // console.log('like');

    commentModel.updateOne({ _id: commentId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next);
}

function dislikeComment(req, res, next) {
    const { commentId } = req.params;
    const { _id: userId } = req.user;

    // console.log('like');

    commentModel.updateOne({ _id: commentId }, { $pull: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Disliked successful!' }))
        .catch(next);
}

module.exports = {
    newComment,
    createComment,
    editComment,
    deleteComment,
    likeComment,
    dislikeComment
};