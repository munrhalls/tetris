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

function paint() {
  console.log("paint");
}
startBtn.onclick = function (e) {
  requestAnimationFrame(paint);
};
