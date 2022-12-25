import makeBoard from "./makeBoard.js";
import requestAnimFrame from "./animateFrame.js";
import processFrame from "./processFrame.js";
makeBoard();

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
let animInterval = null;

function shiftFrame() {
  // processFrame();
}

function loopShiftingFrame(frequency) {
  animInterval = setInterval(function () {
    requestAnimFrame(shiftFrame);
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

pauseBtn.onclick = function () {
  console.log("pause");
};

loopShiftingFrame(1000);
// cancelAnimation();
