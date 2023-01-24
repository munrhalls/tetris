import runner from "../2_running/runner.js";

export default function makeGameInterface() {
  const startBtn = document.getElementById("start");
  const pauseBtn = document.getElementById("pause");

  startBtn.onclick = function () {
    startBtn.classList.add("hidden");
    pauseBtn.classList.remove("hidden");
    runner.runGame();
  };
  pauseBtn.onclick = function () {
    runner.stopGame();
    startBtn.classList.remove("hidden");
    pauseBtn.classList.add("hidden");
  };
}
