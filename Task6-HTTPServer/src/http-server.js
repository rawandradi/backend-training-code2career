"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("node:http");
var server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, { 'content-type': 'application/json' });
            var responseObject = { message: "Welcome to the server" };
            var responseJSON = JSON.stringify(responseObject);
            res.end(responseJSON);
        }
        else if (req.url === '/about') {
            res.writeHead(200, { 'content-type': 'application/json' });
            var responseObject = { message: "This is the about route" };
            var responseJSON = JSON.stringify(responseObject);
            res.end(responseJSON);
        }
        else {
            res.writeHead(404, { 'content-type': 'application/json' });
            res.end(JSON.stringify({ error: "Route not found" }));
        }
    }
    else {
        res.writeHead(405, { 'content-type': 'application/json' });
        res.end(JSON.stringify({ error: "Method not allowed" }));
    }
});
server.listen(3000, function () {
    console.log('Server running at http://localhost:3000');
});
