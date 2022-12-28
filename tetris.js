import makeBoard from "./makeBoard.js";
import requestAnimFrame from "./animateFrame.js";
import processFrame from "./processFrame.js";

document.addEventListener("DOMContentLoaded", initializeGame);
let runGame = null;
let frequency = 500;

async function initializeGame() {
  document.getElementById("tetris").style.display = "block";
  document.getElementById("gameOver").style.display = "none";
  localStorage.setItem("isGameOver", "false");
  await makeBoard();
  await makeInterface();
  await loopShiftingFrame(frequency);
}

async function makeInterface() {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");

  startBtn.onclick = function () {
    cancelAnimation();
  };

  pauseBtn.onclick = function () {
    console.log("pause");
  };
}

async function loopShiftingFrame(frequency) {
  runGame = setInterval(function () {
    if (localStorage.getItem("isGameOver") === "true") return handleGameOver();
    requestAnimFrame(processFrame);
  }, frequency);

  if (!runGame)
    throw new Error("Animation failed to start or be initialized properly.");
}

function handleGameOver() {
  document.getElementById("tetris").style.display = "none";
  document.getElementById("gameOver").style.display = "block";
  cancelAnimation();
}
function cancelAnimation() {
  clearInterval(runGame);
}
