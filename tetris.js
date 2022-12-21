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

if (!startBtn || !tetris) throw new Error("DOM nodes are missing.");
let animation;
let score = [];
let currentTetro = undefined;
let verticalFrequency = 100;
let standardSquare = 20;

let verticalTrack = standardSquare * 25;
let horizontalTrack = standardSquare * 15;
let verticalTrackPos = 0;

let horizontalTrackPos = horizontalTrack / 2 - standardSquare / 2;

let frozenTopTrackPos = [];

if (
  score === undefined ||
  verticalFrequency === undefined ||
  standardSquare === undefined ||
  verticalTrack === undefined ||
  horizontalTrack === undefined ||
  verticalTrackPos === undefined ||
  horizontalTrackPos === undefined ||
  !Array.isArray(frozenTopTrackPos)
)
  throw new Error("Initial variables did not initialize properly.");

tetris.style.height = `${verticalTrack}px`;
tetris.style.width = `${horizontalTrack}px`;

if (!tetris.style.height || !tetris.style.width)
  throw new Error("Tetris board size not initialized properly.");

if (
  tetris.style.height !== `${verticalTrack}px` ||
  tetris.style.width !== `${horizontalTrack}px`
)
  throw new Error("Tetris board size not initialized properly.");

// Board ready

setCurrentTetro();

if (
  !document.getElementsByClassName("current")[0] ||
  document.getElementsByClassName("current").length > 1
)
  throw new Error("Current tetrominoe failed to be initialized properly.");

if (
  !document.getElementsByClassName("current")[0].style.height ||
  !document.getElementsByClassName("current")[0].style.width
)
  throw new Error("Current tetrominoe size was not set.");

function setCurrentTetro() {
  if (document.getElementsByClassName("current")[0]) {
    const previous = document.getElementsByClassName("current")[0];
    previous.classList.remove("current");
  }

  const current = document.createElement("div");
  current.classList.add("tetrominoe");
  current.classList.add("current");
  current.style.height = `${standardSquare}px`;
  current.style.width = `${standardSquare}px`;
  current.style.left = `${horizontalTrackPos}px`;
  tetris.appendChild(current);
  currentTetro = current;

  if (
    currentTetro === undefined ||
    !currentTetro.style.left ||
    !currentTetro.style.width ||
    !currentTetro.style.height
  )
    throw new Error(
      "Current tetrominoe variables did not initialize properly."
    );
  if (
    !Array(...currentTetro.classList).includes("tetrominoe") ||
    !Array(...currentTetro.classList).includes("current")
  )
    throw new Error(
      "Current tetrominoe DOM classes did not initialize properly"
    );
}

// Current tetrominoe ready

function moveCurrentTetro() {
  window.onkeydown = function (e) {
    const left = e.keyCode === 37;
    const right = e.keyCode === 39;
    const bottom = e.keyCode === 40;

    if (horizontalTrackPos < 0 || horizontalTrackPos > horizontalTrack)
      throw new Error("Tetrominoe went out of left or right bound.");

    if (horizontalTrackPos === 0 || horizontalTrackPos === horizontalTrack)
      return;

    if (left) {
      horizontalTrackPos -= standardSquare;
    }
    if (right) return (horizontalTrackPos += standardSquare);
    if (bottom) return (verticalTrackPos += standardSquare);
  };
}

moveCurrentTetro();
// Moving current tetrominoe

function paintVariables() {
  if (verticalTrackPos > verticalTrack - standardSquare)
    throw new Error("Tetrominoe went outside of vertical track.");

  if (frozenTopTrackPos[0] === verticalTrack) {
    return "Game over!";
  } else if (frozenTopTrackPos.includes(verticalTrackPos + standardSquare)) {
    frozenTopTrackPos.push(verticalTrackPos);
    verticalTrackPos = 0;
    setCurrentTetro();
  } else if (verticalTrackPos === verticalTrack - standardSquare) {
    frozenTopTrackPos.push(verticalTrack - standardSquare);
    verticalTrackPos = 0;
    setCurrentTetro();
  } else {
    verticalTrackPos += 10;
    currentTetro.style.top = `${verticalTrackPos}px`;
    currentTetro.style.left = `${horizontalTrackPos}px`;
  }
}

function runAnimation() {
  animation = setInterval(function () {
    requestAnimationFrame(paintVariables);
  }, verticalFrequency);
}

function cancelAnimation() {
  clearInterval(animation);
}

startBtn.onclick = function () {
  startBtn.classList.add("hidden");
  pauseBtn.classList.remove("hidden");
  runAnimation();
};

pauseBtn.onclick = function () {
  pauseBtn.classList.add("hidden");
  startBtn.classList.remove("hidden");
  cancelAnimation();
};
