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

function paintVariables(variables) {
  console.log("repaint");
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
