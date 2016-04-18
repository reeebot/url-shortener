var mongo = require('mongodb').MongoClient;
var url = 'mongodb://shorturl:short123@ds011291.mlab.com:11291/heroku_x1m61d7m';

module.exports = function Query(split, cb){             ////// query the database with request number
    mongo.connect(url, function(err, db) {
        if (err) throw err
        var pull = db.collection('shorturl').find({
            short_id : +split[0]},{                             // search for short_id: request number
                _id : 0,                                        // remove _id & short_id from response
                short_id : 0
            });
        pull.toArray(function(err, data) {
            if (err) throw err;
            db.close(function(){
                cb(data)                                        // returns original_url from search results for redirect or returns none
            });
        });
    });
};