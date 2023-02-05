const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, function(err) {
    if (err) {
        return console.error("App failed connected", err);
    }
    return console.info("sucessfully connected on PORT", PORT)
});

const bookRouter = require("./routers/book");
const favoriteRouter = require("./routers/favorites");
const cartRouter = require("./routers/cart");
const popularRouter = require("./routers/popular");
const recomendRouter = require("./routers/recomend");
app.use("/", bookRouter);
app.use("/", favoriteRouter);
app.use("/", cartRouter);
app.use("/", popularRouter);
app.use("/", recomendRouter);

app.get("/", function (req, res) {
    res.status(200).send("Welcome to Bookstore API");
});