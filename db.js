const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://guest_bookstoreapp:guest000@books-store-cluster.ut8xwjm.mongodb.net/bookstore?retryWrites=true&w=majority";
let dbConnection;

module.exports = {
    connectToDb: function(cb) {
        MongoClient.connect(uri)
            .then( function(client) {
                dbConnection = client.db();
                return cb();
            })
            .catch(err => {
                console.error(err);
                return cb();
            });
    },
    getDb: () => dbConnection
}