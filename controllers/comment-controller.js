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
};

module.exports = commentController;
