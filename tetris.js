import makeBoard from "./makeBoard.js";
import requestAnimFrame from "./animateFrame.js";
import processFrame from "./processFrame.js";

document.addEventListener("DOMContentLoaded", initializeGame);
let isGameRunning = null;
let frequency = 500;

async function initializeGame() {
  await makeBoard();
  await makeInterface();
  await loopShiftingFrame(frequency);
}

console.log([...document.getElementsByTagName("main")].length);

function shiftFrame() {
  processFrame();
}

async function loopShiftingFrame(frequency) {
  isGameRunning = setInterval(function () {
    requestAnimFrame(shiftFrame);
  }, frequency);

  if (!isGameRunning)
    throw new Error("Animation failed to start or be initialized properly.");
}

function cancelAnimation() {
  clearInterval(isGameRunning);
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
