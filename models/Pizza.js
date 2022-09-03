const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: "You need to provide a pizza name!", //requires data to exist for that field, if just "true" then no custom message
            trim: true, //removes white space before and after input string
        },
        createdBy: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal),
            //getter that transofmr data by default upon each query, like middleware for data
            //value of createdAt will now be formatted by dateFormat() and used instead of default timestamp val
            // we can use timestamp value for storage but use prettier version on display
        },
        size: {
            type: String,
            required: true,
            enum: ["Personal", "Small", "Medium", "Large", "Extra Large"], //enumerable, a set of data that can be iterated over, like for loop
            default: "Large",
        },
        toppings: [], //type array, could also say Array
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
        //ref property tells the Pizza model which documents to search to find the right comments
    },
    {
        toJSON: {
            virtuals: true,
            getters: true, //need to tell mongoose model that it should use any getter function specified
        },
        id: false, //this is a virtual the Mongoose returns and we don't need it
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
    return this.comments.reduce(
        //use reduce method to tally up total of every comment with its replies
        (total, comment) => total + comment.replies.length + 1,
        0
    );
    //reduce takes 2 parameters, accumulator (total) and currentValue (comment).
    // as reduce maps thru array, it passes the accumulating total and current value of comment into function
    // with return of function revising the total for the next iteration thru the array
    // reduce is like map but it uses result of each function call for each successive call as it goes thru array (perfect for getting sum of multiple values)
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export Pizza model
module.exports = Pizza;
