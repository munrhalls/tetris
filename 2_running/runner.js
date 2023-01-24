import requestAnimFrame from "./../4_displaying/animateFrame.js";
import repaintFrame from "./../4_displaying/repaintFrame.js";
import scorer from "../3_processing/scorer.js";
import processor from "../3_processing/processor.js";
import resetBoard from "../1_building/resetBoard.js";

const runner = {
  game: false,
  isOver: false,
  frequency: 350,
  timer: {
    seconds: 0,
    minutes: 0,
    start: undefined,
    pause: undefined,
    afterPause: undefined,
    pauseTime: undefined,
    gameTime: undefined,
    interval: null,
  },
  runGame: function runGame() {
    this.handleTimer();
    tetris.style.display = "block";
    end.style.display = "none";

    this.game = setInterval(function () {
      if (this.isOver) return runner.handleGameOver();
      runner.updateSpeed(this.minutes);
      requestAnimFrame(repaintFrame);
    }, this.frequency);
  },
  updateSpeed: function updateSpeed() {
    if (runner.minutes > 1) {
      runner.frequency = runner.frequency = 300;
    }
    if (this.minutes > 2) {
      runner.frequency = 250;
    }
    if (this.minutes > 3) {
      runner.frequency = 150;
    }
  },
  stopGame: function stopGame() {
    this.timer.pause = Date.now();
    clearInterval(this.timer.interval);
    clearInterval(this.game);
  },
  handleTimer: function handleTimer() {
    if (this.timer.pause) {
      this.timer.afterPause = Date.now();
      this.timer.pauseTime = this.timer.afterPause - this.timer.pause;
    }
    if (!this.timer.start) this.timer.start = Date.now();
    if (this.timer.pauseTime)
      this.timer.start = this.timer.start + this.timer.pauseTime;

    this.timer.interval = setInterval(function () {
      let delta = Date.now() - runner.timer.start;
      runner.timer.seconds = Math.floor(delta / 1000);
      runner.timer.minutes = Math.floor(runner.timer.seconds / 60);

      let seconds = runner.timer.seconds;
      let minutes = runner.timer.minutes;
      if (seconds < 10) seconds = `0${seconds}`;
      if (minutes < 10) minutes = `0${minutes}`;

      document.getElementById("timer").innerText = `${minutes}:${seconds}`;
    }, 1000);
  },
  setGameOverDOM: function setGameOverDOM() {
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("endScoreDisplay").innerText = scorer.score;
    document.getElementById("timer").innerText = "00:00";

    tetris.style.display = "none";
    end.style.display = "block";
  },
  handleGameOver: function handleGameOver() {
    clearInterval(this.timer.interval);
    clearInterval(this.game);
    this.isOver = true;
    this.timer = {
      seconds: 0,
      minutes: 0,
      start: undefined,
      pause: undefined,
      afterPause: undefined,
      pauseTime: undefined,
      gameTime: undefined,
      interval: null,
    };
    this.frequency = 350;
    this.setGameOverDOM();
    scorer.reset();
    processor.reset();
    resetBoard();
  },
};

export default runner;
