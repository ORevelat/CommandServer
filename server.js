var http    = require('http');
var server  = http.createServer();

var httpPort = 8090;

server.listen(httpPort);

server.on('listening', function(){
	console.log('Command server started - listening to ', httpPort);
});

server.on('request', function(req, res) {
	var isOk = false;

	var rePattern = /^\/run\/(.+)$/
	var arrMatches = req.url.match(rePattern);

	if (req.method == 'GET' && arrMatches != null) {
		isOk = true;

		var cmd = arrMatches[1];

		console.log('\x1b[91mCommand - ' + cmd + '\x1b[0m');

		var toExecute = '%CD%/commands/' + cmd + '.bat';
		var exec = require('child_process').exec;
		var child = exec(toExecute, function (err, stdout, stder) { /* do not check return error etc */ });
	}

	res.writeHead(isOk ? 200 : 404, {'Content-Type': 'text/plain'});
	res.end(isOk ? 'OK' : 'KO');
});

server.on('error', function(err){
	console.log(err);
});
