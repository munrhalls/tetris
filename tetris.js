// shim layer with setTimeout fallback
window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (
      /* function FrameRequestCallback */ callback,
      /* DOMElement Element */ element
    ) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

var elem = document.getElementById("tetris");
var startTime = undefined;

function render(time) {
  if (time === undefined) time = Date.now();
  if (startTime === undefined) startTime = time;

  elem.style.height = "100px";
  elem.style.background = "black";
  elem.style.top = (((time - startTime) / 5) % 500) + "px";
}

elem.onclick = function () {
  (function animloop() {
    render();
    requestAnimFrame(animloop, elem);
  })();
};
