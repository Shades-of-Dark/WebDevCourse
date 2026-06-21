const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const PORT = 8080;

const server = http.createServer((req, res) => {
    // Determine which file to look for based on the URL
    let filePath = '';

    if (req.url === '/' || req.url === '/home') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'about.html');
    }
    else if (req.url === '/contact-me') {
        filePath = path.join(__dirname, 'contact-me.html');
    }
    else {
        filePath = path.join(__dirname, '404.html');
    }

    // Read the HTML file from the disk
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // If the file doesn't exist (like a missing 404.html)
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            // Success: send the HTML file contents
            res.writeHead(req.url === '/' || req.url === '/about' ? 200 : 404, { 'Content-Type': 'text/html' });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
