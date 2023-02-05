const express = require("express");
const popular = express.Router();

const popularController = require("./../controller/popular");

popular.route("/popular")
    .get(popularController.index);

module.exports = popular;