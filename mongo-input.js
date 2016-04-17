var mongo = require('mongodb').MongoClient;
var mongourl = 'mongodb://localhost:27017/';

module.exports = function Input(random, split){
    mongo.connect(mongourl, function(err, db) {
        if (err) throw err
        var collection = db.collection('shorturl')
        var data = {
            short_id : random,
            original_url : split[1]
        }
        collection.insert(data, function (err, data){
            if (err) throw err;
            db.close();
        });
    });
};