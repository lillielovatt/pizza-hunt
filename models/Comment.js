//could add this to Pizza controller, but this way, the Comment model can be reused
const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
    writtenBy: {
        type: String,
    },
    commentBody: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//we will only see comments when we view pizza's data, that includes assoc comments

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
