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

var plain = document.getElementById("tetris");

var startTime = undefined;

let tWidth = 100;
let moveHorizontally = plain.clientWidth / 2 - tWidth / 2;
let speeding = 0;

function makeTetrominoe() {
  const newTetrominoe = document.createElement("div");
  newTetrominoe.className = "tetrominoe";
  newTetrominoe.id =
    "tetrominoe-" + document.getElementsByClassName("tetrominoe")?.length || 0;

  plain.appendChild(newTetrominoe);
  return newTetrominoe;
}

var tetrominoe = makeTetrominoe();

function render(time) {
  const plainBot = Math.round(plain.getBoundingClientRect().bottom);
  const tetrominoeBot = Math.round(tetrominoe.getBoundingClientRect().bottom);

  if (plainBot > tetrominoeBot)
    window.onkeydown = (e) => {
      if (e.keyCode === 37) moveHorizontally -= 10;
      if (e.keyCode === 39) moveHorizontally += 10;
      if (e.keyCode === 40) speeding += 10;
    };

  if (time === undefined) time = Date.now();
  if (startTime === undefined) startTime = time;

  tetrominoe.style.left = 0 + moveHorizontally + "px";
  tetrominoe.style.height = "100px";
  tetrominoe.style.width = "100px";
  tetrominoe.style.background = "black";
  tetrominoe.style.top = (((time - startTime) / 50) % 500) + speeding + "px";
}

const startBtn = document.getElementById("start__btn");

startBtn.onclick = function () {
  (function animloop() {
    render();
    requestAnimFrame(animloop, tetrominoe);
  })();
};
