const io = require('socket.io-client');

const socket = io('http://localhost:3005');

const password = "123";
socket.on("requestAuthorization", data => {
    console.log("Emitting authorization");
    socket.emit("authorization", password);
});

socket.on("gameInit", data => {
    // Login GM, Login OP
    console.log("Got request for game init");
    socket.emit("serverStatus", "Game inited");
});

socket.on("gameStart", data => {
    // Start the game
    console.log("Got request for game start");
    socket.emit("serverStatus", "Game started");
});

socket.on("gameEnd", data => {
    console.log("Got request for game end");
    socket.emit("serverStatus", "Game ended");
});

socket.on("gameEnd", data => {
    // End the game
});