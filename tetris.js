import makeBoard from "./doers/makeBoard.js";
import requestAnimFrame from "./doers/animateFrame.js";
import processFrame from "./doers/processFrame.js";
import test_rotation from "./tests/test.rotation.js";
import { runner } from "./gameHandlers/runner.js";

test_rotation();

document.addEventListener("DOMContentLoaded", initializeGame);
// let runGame = false;
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
    runner.cancelAnimation();
  };

  pauseBtn.onclick = function () {
    console.log("pause");
  };
}

async function loopShiftingFrame(frequency) {
  runner.runGame = setInterval(function () {
    if (localStorage.getItem("isGameOver") === "true")
      return runner.handleGameOver();
    requestAnimFrame(processFrame);
  }, frequency);
  window.runGame = true;
  if (!runGame)
    throw new Error("Animation failed to start or be initialized properly.");
}

// runner.cancelAnimation();
