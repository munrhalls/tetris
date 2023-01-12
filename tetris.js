import runner from "./handlers/runner.js";
import makeBoard from "./doers/makeBoard.js";
import requestAnimFrame from "./doers/animateFrame.js";
import processFrame from "./doers/processFrame.js";
const tetris = document.getElementById("tetris");
const gameOver = document.getElementById("gameOver");
let frequency = 50;

async function initializeGame() {
  tetris.style.display = "block";
  gameOver.style.display = "none";
  localStorage.setItem("isGameOver", "false");
  await makeBoard();
  await makeInterface();
  await initRepaintLoop(frequency);
}

async function makeInterface() {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  startBtn.onclick = function () {
    runner.cancelAnimation();
  };
  pauseBtn.onclick = function () {
    console.log("pause");
  };
}

async function initRepaintLoop(frequency) {
  runner.runGame = setInterval(function () {
    if (localStorage.getItem("isGameOver") === "true")
      return runner.handleGameOver();

    requestAnimFrame(processFrame);
  }, frequency);

  window.runGame = true;
}

document.addEventListener("DOMContentLoaded", initializeGame);
