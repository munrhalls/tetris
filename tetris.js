import makeBoard from "./doers/makeBoard.js";
import requestAnimFrame from "./doers/animateFrame.js";
import processFrame from "./doers/processFrame.js";
import { runner } from "./handlers/runner.js";
import moverInterface from "./movers/moverInterface.js";

const tetris = document.getElementById("tetris");
const gameOver = document.getElementById("gameOver");

document.addEventListener("DOMContentLoaded", initializeGame);
let frequency = 500;

async function initializeGame() {
  tetris.style.display = "block";
  gameOver.style.display = "none";
  localStorage.setItem("isGameOver", "false");

  await makeBoard();
  await makeInterface();
  await repaintLoop(frequency);
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
  moverInterface();
}

async function repaintLoop(frequency) {
  runner.runGame = setInterval(function () {
    if (localStorage.getItem("isGameOver") === "true")
      return runner.handleGameOver();
    requestAnimFrame(processFrame);
  }, frequency);

  window.runGame = true;
}
