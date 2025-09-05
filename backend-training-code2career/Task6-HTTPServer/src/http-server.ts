import * as http from 'node:http';
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            res.writeHead(200, { 'content-type': 'application/json' });
            const responseObject = { message: "Welcome to the server" };
            const responseJSON = JSON.stringify(responseObject);
            res.end(responseJSON);
        }

        else if (req.url === '/about') {
            res.writeHead(200, { 'content-type': 'application/json' });
            const responseObject = { message: "This is the about route" };
            const responseJSON = JSON.stringify(responseObject);
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


server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});