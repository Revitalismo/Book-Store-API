const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./../db")

let db;

connectToDb(function(err) {
    if (!err) {
        return db = getDb();
    }
    return console.error(err);
});

module.exports = {
    index: function(req, res) {
        const books = [];
    
        if (db !== undefined) {
            db.collection("favorites")
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
                            status: 404,
                            method: req.method,
                            data: undefined,
                            message: "documents is empty"
                        }
                    );
    
                }).catch((err) => {
                    res.status(500).json({error: `error with status ${err}`});            
                });
        }
    },

    add: function(req, res) {
        const id = req.params.id;
        const ObjectIdValid = ObjectId.isValid(id);
        
        if (ObjectIdValid && (db !== undefined)) {
            return db.collection("books")
                    .findOne({_id: ObjectId(id)})
                    .then(document => {
                        if (document) {
                            return db.collection("favorites")
                                .insertOne(document)
                                .then(fn => res.send(
                                    {
                                        status: 201,
                                        method: "POST",
                                        data: document,
                                        message: "You created favorite document"
                                    }
                                ))
                                .catch(fn => res.send(
                                    {
                                        status: 500,
                                        method: "POST",
                                        data: document,
                                        message: "You failed to created document"
                                    }
                                ))
                        }
                        return res.send(
                            {
                                status: 500,
                                method: req.method,
                                data: null,
                                message: "You can't assign empty data"
                            }
                        );
                    }).catch((err) => {
                        res.send(
                            {
                                status: 500,
                                method: req.method,
                                data: data, 
                                message: err
                            }
                        );
                    });
        }
    },

    remove: function(req, res) {
        const ObjectIdValid = ObjectId.isValid(req.params.id);

        if (ObjectIdValid && (db !== undefined)) {
            return db.collection("favorites")
                    .deleteOne({_id: ObjectId(req.params.id)})
                    .then(result => {
                        res.json(
                            {
                                status: 200,
                                method: req.method,
                                data: {},
                                message: result
                            }
                        );
                    })
                    .catch(err => {
                        res.json(
                            {
                                status: 500,
                                method: req.method,
                                data: {},
                                message: "failed to delete document ", err
                            }
                        );
                    });
        }

        return res.json(
            {
                status: 500,
                method: req.method,
                data: {},
                message: "ObjectId is not valid"
            }
        );

    }
}