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
const grid = [];
let animation = false;

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
  const rowNodes = document.getElementsByClassName("row");
  const colNodes = document.getElementsByClassName("column");
}

// Current tetrominoe ready

function moveCurrentTetro() {
  // window.onkeydown = function (e) {
  //   const left = e.keyCode === 37;
  //   const right = e.keyCode === 39;
  //   const bottom = e.keyCode === 40;
  //   if (!animation) return;
  //   if (!animation)
  //     throw new Error(
  //       "Execution not paused upon animation variable being null."
  //     );
  //   if (verticalTrackPos >= verticalTrack)
  //     throw new Error("Tetrominoe went outside of vertical track.");
  //   if (horizontalTrackPos < 0)
  //     throw new Error("Tetrominoe went out of left bound.");
  //   if (horizontalTrackPos > horizontalTrack - standardSquare)
  //     throw new Error("Tetrominoe went ouf of right bound.");
  //   console.log(e.keyCode);
  //   if (left && horizontalTrackPos !== 0)
  //     return (horizontalTrackPos -= standardSquare);
  //   if (right && horizontalTrackPos < horizontalTrack - standardSquare)
  //     return (horizontalTrackPos += standardSquare);
  //   if (bottom && verticalTrackPos < verticalTrack - standardSquare) {
  //     return (verticalTrackPos += standardSquare);
  //   }
  // };
}

function passivelyMoveCurrentTetro() {}

moveCurrentTetro();

passivelyMoveCurrentTetro();

// Moving current tetrominoe ready

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

function displayGameOver() {
  const gameOver = document.createElement("article");
  gameOver.id = "gameOver";
  const titleNode = document.createElement("h1");
  titleNode.innerText = "Game over.";
  titleNode.classList.add("title");
  gameOver.appendChild(titleNode);

  const scoreNode = document.createElement("h1");
  scoreNode.innerText = `Congratulations, your score is: ${score.reduce(
    (acc, val) => acc + val,
    0
  )}!`;
  scoreNode.classList.add("score");

  gameOver.appendChild(scoreNode);
  if (score[0]) {
    const highestTetrisNode = document.createElement("h1");
    highestTetrisNode.innerText = `Your highest tetris assembly was: ${
      score.sort((a, b) => a + b)[0] || 0
    }. Press start to play again.`;
    highestTetrisNode.classList.add("highest-assembly");
    gameOver.appendChild(highestTetrisNode);
  }

  const restartBtn = document.createElement("button");
  restartBtn.id = "restartBtn";
  restartBtn.classList.add("btn");
  restartBtn.innerText = "PLAY AGAIN";
  restartBtn.onclick = function () {
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    tetris.replaceChildren();
    setNewCurrentTetro();
    runAnimation();
  };
  gameOver.appendChild(restartBtn);
  tetris.replaceChildren(gameOver);
}

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
