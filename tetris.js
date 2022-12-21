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

const startBtn = document.getElementById("start__btn");
const tetris = document.getElementById("tetris");

let currentTetro = undefined;
let standardSquare = 10;
let verticalTrackPos = 0;
let verticalTrack = standardSquare * 50;
let horizontalTrack = standardSquare * 30;

tetris.style.height = `${verticalTrack}px`;
tetris.style.width = `${horizontalTrack}px`;

setCurrentTetro();
function setCurrentTetro() {
  const div = document.createElement("div");
  div.classList.add("tetrominoe");
  div.classList.add("current");
  div.style.height = `${standardSquare}px`;
  div.style.width = `${standardSquare}px`;
  div.style.left = tetris.appendChild(div);
  currentTetro = div;
}

function paintVariables() {
  console.log(currentTetro);
  verticalTrackPos += 10;
  currentTetro.style.top = verticalTrackPos + "px";
}

function runAnimation() {
  let condition = 0;

  setInterval(function () {
    requestAnimationFrame(paintVariables);
  }, 1000);
}

startBtn.onclick = function () {
  runAnimation();
};
