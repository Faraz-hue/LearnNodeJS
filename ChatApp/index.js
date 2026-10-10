const express = require("express");
const app = express();
const path = require("path")
const http = require("http");

const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server);


// Socket.io
io.on("connection", (socket) => {
    socket.on("user-message", message => {
        io.emit("message", message)

    })
})

app.use(express.static(path.resolve("./public")))

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html")
})

io.on("connection", (socket) => {

    console.log("A user connected:", socket.id);


    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});


server.listen(8000, () => {
    console.log("Server started on PORT 8000");
});