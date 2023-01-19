import runner from "../2_running/runner.js";

export default function makeGameInterface() {
  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");
  startBtn.onclick = function () {
    runner.runGame();
  };
  pauseBtn.onclick = function () {
    runner.stopGame();
  };
}
