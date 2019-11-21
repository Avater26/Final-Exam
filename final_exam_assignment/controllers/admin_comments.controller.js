const {
    getCommentList,
    commentDelete
} = require('../models/comment.model');

exports.getComments = async function (req, res, next) {
    try {
        const comments = await getCommentList();
        res.render('admin_comments', {
            results: comments,
            db: 'Kommentarer'
        })
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}

exports.deleteComment = async function (req, res, next) {
    try {
        await commentDelete(req.params.id);
        res.redirect('/admin/comments')
    } catch (error) {
        console.log(error);
        res.send("Something went wrong");
    }
}