const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express")

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello from Home Page")
});

app.get('/about', (req, res) => {
    return res.send("Hello from About")
});

function myHandler(req, res) {
    if (req.url === "/favicon.ico") return res.end();

    const log = `${new Date().toISOString()}: ${req.method} ${req.url} Req received\n`;
    const myUrl = url.parse(req.url, true);

    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        switch (myUrl.pathname) {
            case "/":
                if (req.method === "GET") {
                    res.end("Home page");
                }
                break;

            case "/about":
                res.end(`Hi, ${myUrl.query.myname}`);
                break;

            case "/search":
                res.end(`Searching for ${myUrl.query.search_query}`);
                break;

            case "/signup":
                if (req.method === "GET") {
                    res.end("This is a signup form");
                } else if (req.method === "POST") {
                    // DB Query
                    res.end("Success");
                }
                break;

            default:
                res.statusCode = 404;
                res.end("Page not found");
        }
    });
}

const myServer = http.createServer(app);

myServer.listen(8000, () => {
    console.log("Server started");
});