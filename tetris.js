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

var elem = document.getElementById("tetris");
var startTime = undefined;

function render(time) {
  let right = 0;
  let left = 0;
  window.onkeyup = (e) => {
    if (e.keyCode === 37) left = 10;
    if (e.keyCode === 39) right = 10;
    console.log(left);
  };

  if (time === undefined) time = Date.now();
  if (startTime === undefined) startTime = time;
  elem.style.right = elem.style.right.split("px")[0] + right + "px";
  elem.style.height = "100px";
  elem.style.background = "black";
  elem.style.top = (((time - startTime) / 50) % 500) + "px";
}

const startBtn = document.getElementById("start__btn");
const quitBtn = document.getElementById("quit__btn");

startBtn.onclick = function () {
  (function animloop() {
    render();
    requestAnimFrame(animloop, elem);
  })();
};

quitBtn.onclick = function () {};
