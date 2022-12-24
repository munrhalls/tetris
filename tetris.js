import makeBoard from "./makeBoard.js";
import processCurrentFrame from "./processCurrentFrame.js";
makeBoard();

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

if (!requestAnimFrame)
  throw new Error(
    "Window requestAnimationFrame method did not initialize properly."
  );

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
let animInterval = null;

function processNextFrame() {
  console.log("next frame");
}

function shiftFrame() {
  processCurrentFrame();
  processNextFrame();
}

function loopShiftingFrame(frequency) {
  animInterval = setInterval(function () {
    requestAnimationFrame(shiftFrame);
  }, frequency);

  if (!animInterval)
    throw new Error("Animation failed to start or be initialized properly.");
}
function cancelAnimation() {
  clearInterval(animInterval);
}

startBtn.onclick = function () {
  cancelAnimation();
};

// loopShiftingFrame(50);
