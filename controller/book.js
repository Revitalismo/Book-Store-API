const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./../db")

let db;

connectToDb(function(err) {
    if (!err) {
        db = getDb();
    }
});

module.exports = {
    detail: function(req, res) {
        const ObjectIdValid = ObjectId.isValid(req.params.id);

        if (ObjectIdValid && (db !== undefined)) {
            return db.collection("books")
                    .findOne({_id: ObjectId(req.params.id)})
                    .then(document => {
                        if (document) {
                            return res.send(
                                {
                                    status: 200,
                                    method: req.method,
                                    data: document,
                                    message: "success"
                                }
                            );
                        }
                        return res.send(
                            {
                                status: 404,
                                method: req.method,
                                data: undefined,
                                message: "document not found"
                            }
                        );
                    })
                    .catch(err => {
                        res.status(500).json({error: `error with status ${err}`});
                    });
        }
    
        return res.json(
                {
                    status: 500,
                    method: req.method,
                    data: undefined,
                    message: "ObjectId is not valid"
                }
            );
    
    },

    search: function(req, res) {
        const query = req.query.q;
        const books = [];

        if (db !== undefined) {
            db.collection("books")
                .find({ $text: {$search: `"${query}"`}})
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
                            status: 404,
                            method: req.method,
                            data: [],
                            message: "documents not found"
                        }
                    );
    
                }).catch((err) => {
                    res.send(
                        {
                            status: 500,
                            method: req.method,
                            data: undefined,
                            message: err
                        }
                    );     
                });   
        }
    }
}