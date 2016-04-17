var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

module.exports = function Query(random, split, cb){
    mongo.connect(url, function(err, db) {
        if (err) throw err
        var pull = db.collection('shorturl').find({
            short_id : +split[0]},{
                _id : 0,
                short_id : 0
            });
        pull.toArray(function(err, data) {
            if (err) throw err;
            db.close(function(){
                cb(data)
            });
        });
    });
};