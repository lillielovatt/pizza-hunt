//could add this to Pizza controller, but this way, the Comment model can be reused
const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReplySchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment _id
        // need unique identifier instead of default _id field
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        replyBody: {
            type: String,
            required: "You need to provide a comment!", //requires data to exist for that field, if just "true" then no custom message
            trim: true,
        },
        writtenBy: { type: String, required: "You need to provide a name!" },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
    },
    {
        toJSON: {
            getters: true, //need to tell mongoose model that it should use any getter function specified
        },
    }
);

const CommentSchema = new Schema(
    {
        writtenBy: {
            type: String,
            required: "You need to provide a name!", //requires data to exist for that field, if just "true" then no custom message
            trim: true,
        },
        commentBody: {
            type: String,
            required: "You need to provide a comment!", //requires data to exist for that field, if just "true" then no custom message
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
        },
        replies: [ReplySchema], //associate replies with comments
        // unlike relationship between pizza and comment data, replies will be nested direclty in comment document and NOT referred to
    },
    {
        toJSON: {
            virtuals: true, //without this, virtuals won't work
            getters: true, //need to tell mongoose model that it should use any getter function specified
        },
        id: false,
    }
);

// get total reply count for comment, used later to combine reply count and comment count
CommentSchema.virtual("replyCount").get(function () {
    return this.replies.length;
});

//we will only see comments when we view pizza's data, that includes assoc comments

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
