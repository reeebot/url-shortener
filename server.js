var express = require('express')
var app = express()
var port = process.env.PORT || 8080;

app.route('/').get(function (req, res) {
	res.sendFile(process.cwd()+'/public/index.html');
});

app.get('/*', function(req, res) {
    var requrl = url.parse(req.url).pathname;
    var cleanreq = requrl.replace(/^\/|\/$|%20+/g, '');
    
    var jsonstring = {
        unix : unixtime,
        natural : naturaltime
    }
    res.send(JSON.stringify(jsonstring))
});

app.listen(port, function() {
	console.log('server listening')
})