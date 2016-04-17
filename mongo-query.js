var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

module.exports = function Query(random, split){
    mongo.connect(url, function(err, db) {
        if (err) throw err
        var pull = db.collection('shorturl').find({
            short_id : split[1]
        });
        pull.toArray(function(err, data) {
            if (err) throw err
            console.log(data);
            db.close();
        });
    });
};