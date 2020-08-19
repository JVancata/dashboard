const socket = io('http://localhost:3005');
const password = localStorage.getItem("password");

socket.on("requestAuthorization", data => {
    console.log("Emitting authorization");
    socket.emit("authorization", password);
});

const serverResponseTable = document.querySelector("#serverResponse");
socket.on("serverStatus", data => {
    const row = serverResponseTable.insertRow(1);
    const dateCell = row.insertCell(0);
    const statusCell = row.insertCell(1);

    dateCell.innerHTML = "Date";
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

const passwordButton = document.querySelector("#passwordButton");
const passwordInput = document.querySelector("#passwordInput");
passwordButton.addEventListener("click", () => {
    localStorage.setItem("password", passwordInput.value);
    window.location.reload();
});