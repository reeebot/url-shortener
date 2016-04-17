var mongo = require('mongodb').MongoClient;
var mongourl = 'mongodb://shorturl:short123@ds011291.mlab.com:11291/heroku_x1m61d7m';

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