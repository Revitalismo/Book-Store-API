const express = require("express");
const cart = express.Router();

const cartController = require("./../controller/cart");

cart.route("/cart")
    .get(cartController.index)
    
cart.route("/cart/:id")
    .post(cartController.add)
    .delete(cartController.remove);

cart.patch("/cart/increase/:id", cartController.increase);
cart.patch("/cart/decrease/:id", cartController.decrease);

module.exports = cart;