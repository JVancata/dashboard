const socket = io('http://192.168.1.226:3005');
const password = localStorage.getItem("password");

socket.on("requestAuthorization", data => {
    console.log("Emitting authorization");
    socket.emit("authorization", password);
});

const getCurrentTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
}

const serverResponseTable = document.querySelector("#serverResponse");
socket.on("serverStatus", data => {
    const row = serverResponseTable.insertRow(1);
    const dateCell = row.insertCell(0);
    const statusCell = row.insertCell(1);

    dateCell.innerHTML = getCurrentTime();
    statusCell.innerHTML = data;
});

/* Game init */
const initButton = document.querySelector("#initButton");
initButton.addEventListener("click", () => {
    socket.emit("init", "Init");
});

/* Game start */
const startButton = document.querySelector("#startButton");
startButton.addEventListener("click", () => {
    socket.emit("start", "Starting");
});

/* Game end */
const endGameButton = document.querySelector("#endGameButton");
endGameButton.addEventListener("click", () => {
    socket.emit("end", "Ending");
});

/* TP players */
const tpButton = document.querySelector("#tpButton");
tpButton.addEventListener("click", () => {
    socket.emit("tp", "Teleporting");
});


/* Active characters */
socket.on('activeCharacters', data => {
    const activePlayersTable = document.querySelector("#activePlayers");
    data.forEach(player => {
        const row = activePlayersTable.insertRow(1);
        const nameCell = row.insertCell(0);
        const nationCell = row.insertCell(1);

        nameCell.innerHTML = player.charName;
        nationCell.innerHTML = player.nation;
    });
});


const passwordButton = document.querySelector("#passwordButton");
const passwordInput = document.querySelector("#passwordInput");
passwordButton.addEventListener("click", () => {
    localStorage.setItem("password", passwordInput.value);
    window.location.reload();
});