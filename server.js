var express = require('express')
var app = express()
var url = require('url')
var port = process.env.PORT || 8080;
var Input = require('./mongo-input')
var Query = require('./mongo-query')

app.route('/').get(function (req, res) {	        	////// serve static index.html
	res.sendFile(process.cwd()+'/public/index.html');
});

app.get('/*', function(req, res) {                      ////// compute the request
    var requrl = url.parse(req.url).pathname;               	// get request pathname
    var cleanreq = requrl.replace(/^\//g, '');          	    // remove first forward slash/
    var split = cleanreq.split(/\/(.+)/, 2);	                // split into array of two after the first forward slash/ if present

    if (split[0] === "new") {					        ////// request is new entry
        if (split[1]){ //invalid URL format ie http://www
        
    }
        else {
        var random = Math.floor(Math.random()*9000) + 1000;     // create random 4 digit number
        var input = new Input(random, split);                   // input to database: random & split[1]  (assumes random number doesn't already exist in database, will overwrite previous entry if it exists)
		var jsonresponse = {                                    // display original and short urls to user
            original_url : split[1],
            short_url : "http://rebot-fcc-third.herokuapp.com/" + random
            }
        res.send(JSON.stringify(jsonresponse))
        }
    }
    
    else if (Number.isInteger(+split[0])) {	        	////// request is existing entry
    	//check database for request 
        var query = new Query(random, split);
    	//if request exists, redirect to stored url
        
            //if request doesn't exist:
            var jsonresponse = {
                error : "This URL is not in the database."
            }
            res.send(JSON.stringify(jsonresponse))
		res.send("redirecting...")
    }
    else {									        	////// request doesn't exist
    	var jsonresponse = {
    		error : "Invalid URL Format."
    	}
    	res.send(JSON.stringify(jsonresponse))
    }
});

app.listen(port, function() {                           ////// start server
	console.log('server listening')
})