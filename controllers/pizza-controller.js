const { Pizza } = require("../models");
const { db } = require("../models/Pizza");

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({}) //equivalent to sequelize's findAll
            .then((dbPizzaData) => res.json(dbPizzaData))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
            .then((dbPizzaData) => {
                // if no pizza found, send 404
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: "No pizza found with this id!",
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // create Pizza
    createPizza({ body }, res) {
        //destructure body out of req object because we dont need anything else
        Pizza.create(body)
            .then((dbPizzaData) => res.json(dbPizzaData))
            .catch((err) => res.status(400).json(err));
    },
    // update pizza by id
    updatePizza({ params, body }, res) {
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            //without { new: true }, it will return the original document. This way, we tell mongoose to return the new version of document
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: "No pizza found with this id!",
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.status(400).json(err));
    },
    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then((dbPizzaData) => {
                if (!dbPizzaData) {
                    res.status(404).json({
                        message: "No pizza found with this id!",
                    });
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch((err) => res.status(400).json(err));
    },
};

module.exports = pizzaController;
