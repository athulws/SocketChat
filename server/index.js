const express = require("express");
const app = express();
const http = require("http");// to build server with socket.io
const cors = require("cors");
const { Server } = require("socket.io");//ithil ulla "Server" class name aan
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {// "on" enn parayunnath oru event aan
    console.log(`User Connected: ${socket.id}`);// usernte ID aan socket.id

    socket.on("join_room", (data) => {//event emit cheyyan ulla name (ie, data pass cheyyan kodukkunna name )aan "join_room" // data room il join cheyyunna id aan
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => { //data pass cheyyan kodukkunna name aan "send_message"
        // console.log(data);
        socket.to(data.room).emit("receive_message", data);// ivide same room number kodutha aalk mathram chat cheyyan aan"socket.to(data.room)" koduthath
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});