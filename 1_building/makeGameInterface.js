import runner from "../handlers/runner.js";

export default function makeGameInterface() {
  const startBtn = document.getElementById("startBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  startBtn.onclick = function () {
    runner.stopGame();
  };
  pauseBtn.onclick = function () {
    console.log("pause");
  };
}
