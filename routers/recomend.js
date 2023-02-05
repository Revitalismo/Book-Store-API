const express = require("express");
const recomend = express.Router();

const recomendController = require("./../controller/recomend");

recomend.route("/recomend")
    .get(recomendController.index);

module.exports = recomend;