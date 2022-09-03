const { Comment, Pizza } = require("../models");

// when you create a comment, it's not standalone--it belongs to a pizza
const commentController = {
    // add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $push: { comments: _id } }, //adds data to an array. all MongoDB functions start with $
                    { new: true }
                );
            })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: "No pizza found with this id!",
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.json(err));
    },
    // add reply to comment. with new replies, not creating a reply document--only updating an existing comment
    addReply({ params, body }, res) {
        //passing params as parameter, need to make sure we pass it to addReply when we implement it later in route
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $push: { replies: body } }, //push value of body into the replies array
            { new: true, runValidators: true }
        )
            .then((dbCommentData) => {
                if (!dbCommentData) {
                    return res
                        .status(404)
                        .json({ message: "No comment found with this id!" });
                }
                res.json(dbCommentData);
            })
            .catch((err) => res.json(err));
    },
    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId }) //deletes document and also returns its data
            .then((deletedComment) => {
                //take data and use it to identify and remove it from assoc pizza
                if (!deletedComment) {
                    return res
                        .status(404)
                        .json({ message: "No comment with this id!" });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    { $pull: { comments: params.commentId } }, //opposite of push, removes from array
                    { new: true }
                );
            })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: "No pizza found with this id!",
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.json(err));
    },
    // delete reply
    removeReply({ params }, res) {
        Comment.findOneAndUpdate(
            { _id: params.commentId },
            { $pull: { replies: { replyId: params.replyId } } },
            //remove specific reply from replies array, where replyId matches value of params.replyId passed in from route
            { new: true }
        )
            .then((dbReplyData) => {
                if (!dbReplyData) {
                    return res
                        .status(404)
                        .json({ message: "No comment with this id found!" });
                }
                res.json(dbReplyData);
            })
            .catch((err) => res.json(err));
    },
};

module.exports = commentController;
