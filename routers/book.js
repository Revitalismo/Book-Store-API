const express = require("express");
const book = express.Router();

const userController = require("./../controller/book");

book.route("/books")
    .get(userController.search);

book.route("/book/:id")
    .get(userController.detail);


module.exports = book;