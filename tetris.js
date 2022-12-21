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

var container = document.getElementById("tetris");
var elem = document.getElementById("tetrominoe");

var startTime = undefined;

let tWidth = 100;
let moveHorizontally = container.clientWidth / 2 - tWidth / 2;

function render(time) {
  window.onkeydown = (e) => {
    if (e.keyCode === 37) moveHorizontally -= 10;
    if (e.keyCode === 39) moveHorizontally += 10;
  };

  if (time === undefined) time = Date.now();
  if (startTime === undefined) startTime = time;

  elem.style.left = 0 + moveHorizontally + "px";
  elem.style.height = "100px";
  elem.style.width = "100px";
  elem.style.background = "black";
  elem.style.top = (((time - startTime) / 50) % 500) + "px";
}

const startBtn = document.getElementById("start__btn");

startBtn.onclick = function () {
  (function animloop() {
    render();
    requestAnimFrame(animloop, elem);
  })();
};
