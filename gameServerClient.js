// Example of game server client
require('dotenv').config()
const { port, password, serverUrl } = process.env;

const io = require('socket.io-client');

const socket = io(`${serverUrl}:${port}`);

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

socket.on("gameTp", data => {
    console.log("Got request for game tp");
    socket.emit("serverStatus", "Players teleported");
});

socket.on("gameEnd", data => {
    // End the game
});