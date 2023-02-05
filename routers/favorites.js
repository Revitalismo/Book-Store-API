const express = require("express");
const favorite = express.Router();

const favoriteController = require("./../controller/favorite");

favorite.route("/favorites")
        .get(favoriteController.index);
        
favorite.route("/favorites/:id")
        .post(favoriteController.add)
        .delete(favoriteController.remove);

module.exports = favorite;
