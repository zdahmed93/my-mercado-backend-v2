const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello from a Basic Node HTTP Server');
});

server.listen(process.env.PORT || 5000);