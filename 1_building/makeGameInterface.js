import runner from "../2_running/runner.js";

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
