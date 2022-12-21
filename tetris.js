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
let trackPos = 0;
let trackLength = Math.floor(tetris.getBoundingClientRect().height);

setCurrentTetro();
function setCurrentTetro() {
  const div = document.createElement("div");
  div.classList.add("tetrominoe");
  div.classList.add("current");
  div.style.height = "50px";
  div.style.width = "50px";
  tetris.appendChild(div);
  currentTetro = div;
}

function paintVariables() {
  console.log(currentTetro);
  trackPos += 10;
  currentTetro.style.top = trackPos + "px";
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
