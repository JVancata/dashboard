const options = { secure: true };
var io = require('socket.io')(3005, options);

const password = "123";
const authorized = {};

io.on('connect', socket => {
    console.log("Client connected, sending authorization request.");
    socket.emit("requestAuthorization");

    /* Authorization */
    socket.on('authorization', data => {
        if (data === password) {
            console.log("Client authorized.");
            authorized[socket.id] = true;
            socket.join("game");
        }
        else {
            console.log("Invalid password.");
            socket.disconnect(true);
        }
    });

    /* Server client */
    socket.on("serverStatus", data => {
        if (!authorized[socket.id]) return;
        console.log(`Got game server status ${data}`);
        socket.to("game").emit("serverStatus", data);
    });

    /* Admin client */
    socket.on("init", data => {
        if (!authorized[socket.id]) return;
        socket.to("game").emit("gameInit");
    });

    socket.on("start", data => {
        if (!authorized[socket.id]) return;
        socket.to("game").emit("gameStart");
    });

    socket.on("end", data => {
        if (!authorized[socket.id]) return;
        socket.to("game").emit("gameEnd");
    });

    /* DC */
    socket.on('disconnect', data => {
        if (!authorized[socket.id]) return;
        authorized[socket.id] = false;
    });
});