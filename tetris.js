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
const tetris = document.getElementById("tetris");

const rows = 24;
const columns = 16;
const standardSquare = 20;
const verticalFrequency = 1;

let animation = false;

const grid = [];
for (let x = 0; x < rows; x++) {
  grid.push([]);
  const row = document.createElement("div");
  row.style.height = `${standardSquare}px`;
  row.classList.add(`row`);
  row.classList.add(`x-${x}`);

  for (let y = 0; y < columns; y++) {
    grid[grid.length - 1].push(y);
    const column = document.createElement("div");
    column.style.height = `${standardSquare}px`;
    column.style.width = `${standardSquare}px`;
    column.classList.add(`column`);
    column.classList.add(`y-${y}`);
    row.appendChild(column);
  }
  tetris.appendChild(row);
}

const rowNodes = document.getElementsByClassName("row");
const colNodes = document.getElementsByClassName("column");

// Board ready

setNewCurrentTetro();

function setNewCurrentTetro() {
  const tetro = [
    [0, 12],
    [0, 13],
    [1, 14],
  ];
}

// Current tetrominoe ready

function moveCurrentTetro() {}

function passivelyMoveCurrentTetro() {}

moveCurrentTetro();

passivelyMoveCurrentTetro();

function checkCollision() {}

function paintVariables() {}

function runAnimation() {
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
  runAnimation();
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
