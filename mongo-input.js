var mongo = require('mongodb').MongoClient;
var mongourl = 'mongodb://shorturl:short123@ds011291.mlab.com:11291/heroku_x1m61d7m';

module.exports = function Input(split, cb){     ////// input into the database
    mongo.connect(mongourl, function(err, db) {
        if (err) throw err
        var collection = db.collection('shorturl')

        var findone = collection.findOne( {original_url : split[1]},{   // look first if URL already exist in database
                _id : 0,
            }, function(err, doc){
                if (err) throw err;
                if (doc){                                               // if URL already exists, return the shortURL already in database 
                    db.close(function(){
                        cb(doc.short_id)
                    })
                } else {                                                // if URL doesn't exist, create shortURL
                    var random = Math.floor(Math.random()*9000) + 1000; // create random 4 digit number
                    var data = {                                        // setup input data
                        short_id : random,
                        original_url : split[1]
                    }
                    collection.insert(data, function (err, data){       // insert data into database
                        if (err) throw err;
                        db.close(function(){
                            cb(random)                                  // return random shortURL number
                        });
                    })
                }
            }
        );
    });
};