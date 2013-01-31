
"use strict";

var http = require('http'),
    path = require('path'),
    url = require('url'),
    send = require('send');

var Util = require('./util');

var MAX_AGE = 3600;

var server = http.createServer(function (req, res) {
    var root = path.join(__dirname, 'static');
    var pathname = url.parse(req.url).pathname;

    function error(err) {
        if (err.status == 404) {
            send(req, '404.html').root(root).maxage(MAX_AGE).pipe(res);
        } else {
            res.statusCode = err.status || 500;
            res.end(err.message);
        }
    }

    send(req, pathname).root(root).maxage(MAX_AGE).on('error', error).pipe(res);
});

server.on('error', function (e) {
    if (e.code == 'EADDRINUSE') {
        console.log(Util.getTime() + ' ERROR address and port already in use, exit 1');
        process.exit(10);
    }
});

module.exports = server;

server.listen(process.env['app_port'] || 80)
