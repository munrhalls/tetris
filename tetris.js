import makeBoard from "./makeBoard.js";
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

// Board ready
//////////////////////////////////////////////

function setNewCurrentTetro() {
  const tetro = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 3],
  ];
  // move tetro

  tetro.forEach((el) => (el[0] = el[0] + 20));

  // check vertical collision
  const frozen = [
    [23, 0],
    [22, 0],
    [21, 0],
    [21, 1],
    [21, 2],
  ];

  for (let xy of tetro) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("black");
  }

  for (let xy of frozen) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("black");
    cell.classList.add("frozen");
  }

  const freeze = tetro.find((xy) => {
    const nextVerticalCell = document.getElementById(
      `cellXY-${xy[0] + 1}-${xy[1]}`
    );
    console.log(nextVerticalCell);
    console.log([...nextVerticalCell.classList].includes("frozen"));
    return [...nextVerticalCell.classList].includes("frozen");
  });
}

// Current tetrominoe ready

function moveCurrentTetro() {}

function passivelyMoveCurrentTetro() {}

function checkCollision() {}

function paintVariables() {
  // 1st tick or - AFTER - current coords group FREEZE/BOTTOM
  // new current coords group is generated and delivered here
  // current coords group is painted
  // conditions determining state of
  // 2nd tick
  // passive movement to bottom
  //
  // some stuff that says which cells count as current tetro
  // some stuff that says which cells count as frozen tetro
  //
}

function loopShiftingFrame() {
  animation = setInterval(function () {
    requestAnimationFrame(paintVariables);
  }, verticalFrequency);

  if (!animation)
    throw new Error("Animation failed to start or be initialized properly.");
}
function cancelAnimation() {
  clearInterval(animation);
}
// game runner

function gameOver() {
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
  cancelAnimation();
  displayGameOver();
}

function displayGameOver() {}

startBtn.onclick = function () {
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  loopShiftingFrame();
};

pauseBtn.onclick = function () {
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");

  if (animation) {
    cancelAnimation();
    animation = null;
  }

  if (animation)
    throw new Error("Animation variable not null after game paused.");
};

setNewCurrentTetro();

moveCurrentTetro();

passivelyMoveCurrentTetro();
