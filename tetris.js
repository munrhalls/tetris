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

const startBtn = document.getElementById("startBtn");
const tetris = document.getElementById("tetris");

if (!startBtn || !tetris) throw new Error("DOM nodes are missing.");

let currentTetro = undefined;
let verticalFrequency = 50;
let standardSquare = 20;
let verticalTrackPos = 0;
let verticalTrack = standardSquare * 25;
let horizontalTrack = standardSquare * 15;

tetris.style.height = `${verticalTrack}px`;
tetris.style.width = `${horizontalTrack}px`;

if (!tetris.style.height || !tetris.style.width)
  throw new Error("Tetris board size not initialized properly.");

if (
  tetris.style.height !== `${verticalTrack}px` ||
  tetris.style.width !== `${horizontalTrack}px`
)
  throw new Error("Tetris board size not initialized properly.");
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
  current.style.left = `${horizontalTrack / 2 - standardSquare / 2}px`;
  current.style.left = tetris.appendChild(current);
  currentTetro = current;
}

function paintVariables() {
  if (
    verticalTrackPos > verticalTrack - standardSquare ||
    verticalTrackPos === verticalTrack - standardSquare
  ) {
    verticalTrackPos = 0;
    setCurrentTetro();
  } else {
    verticalTrackPos += 10;
    currentTetro.style.top = verticalTrackPos + "px";
  }
}

function runAnimation() {
  setInterval(function () {
    requestAnimationFrame(paintVariables);
  }, verticalFrequency);
}

startBtn.onclick = function () {
  runAnimation();
};
