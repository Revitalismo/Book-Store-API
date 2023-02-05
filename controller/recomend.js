const { connectToDb, getDb } = require("./../db")

let db;

connectToDb(function(err) {
    if (!err) {
        db = getDb();
    }
});

module.exports = {
    index: function(req, res) {
        const books = [];
    
        if (db !== undefined) {
            db.collection("recomend")
                .find()
                .forEach(book => books.push(book))
                .then(func => {
                    if (books.length > 0) {
                        return res.send(
                            {
                                status: 200,
                                method: req.method,
                                data: books,
                                message: "success"
                            }
                        );
                    }
                    return res.send(
                        {
                            status: 500,
                            method: req.method,
                            data: undefined,
                            message: "documents is empty"
                        }
                    );
    
                }).catch((err) => {
                    res.status(500).json({error: `error with status ${err}`});            
                });
        }
    }
};