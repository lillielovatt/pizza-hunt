const { Schema, model } = require("mongoose");

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
    },
    createdBy: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    size: {
        type: String,
        default: "Large",
    },
    toppings: [], //type array, could also say Array
});

// create the Pizza model using the PizzaSchema
const Pizza = model("Pizza", PizzaSchema);

// export Pizza model
module.exports = Pizza;