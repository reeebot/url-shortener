var express = require('express')
var app = express()
var moment = require('moment');
var url = require('url');
var port = process.env.PORT || 8080;

app.route('/').get(function (req, res) {
	res.sendFile(process.cwd()+'/public/index.html');
});

app.get('/*', function(req, res) {
    var requrl = url.parse(req.url).pathname;
    var cleanreq = requrl.replace(/^\/|\/$|%20+/g, '');

    if (moment(+cleanreq).isValid()|moment(cleanreq).isValid()){
        
        if (isNaN(cleanreq)) {
            var unixtime = moment(cleanreq.toString(), "MMMM-DD-YYYY").unix()
            var naturaltime = moment(cleanreq.toString(), "MMMM-DD-YYYY").format("MMMM D, YYYY")
        }
        else {
            var unixtime = moment.unix(+cleanreq, "MMMM-DD-YYYY").unix()
            var naturaltime = moment.unix(+cleanreq).format("MMMM D, YYYY")
        }
    }
    else {
        var unixtime = null
        var naturaltime = null
    }
    
    var jsonstring = {
        unix : unixtime,
        natural : naturaltime
    }
    res.send(JSON.stringify(jsonstring))
});

app.listen(port, function() {
	console.log('Node.js listening on port 8080 ...')
})