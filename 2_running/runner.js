import requestAnimFrame from "./../4_displaying/animateFrame.js";
import repaintFrame from "./../4_displaying/repaintFrame.js";
import checker from "./../3_processing/checker.js";

const runner = {
  game: false,
  isOver: false,
  frequency: 500,
  timer: {
    interval: null,
    pause: 0,
    minutes: 0,
    seconds: 0,
  },
  time: undefined,
  start: undefined,
  pause: undefined,
  afterPause: undefined,
  pauseTime: undefined,
  gameTime: undefined,
  runGame: function runGame() {
    this.handleTimer();
    tetris.style.display = "block";
    end.style.display = "none";

    this.game = setInterval(function () {
      if (this.isOver) return runner.handleGameOver();
      requestAnimFrame(repaintFrame);
    }, this.frequency);
  },
  stopGame: function stopGame() {
    this.pause = Date.now();
    clearInterval(this.timer.interval);
    clearInterval(this.game);
  },
  handleTimer: function handleTimer() {
    if (this.pause) {
      this.afterPause = Date.now();
      this.pauseTime = this.afterPause - this.pause;
    }
    console.log(this.pauseTime);
    if (!this.start) this.start = Date.now();
    if (this.pauseTime) this.start = this.start + this.pauseTime;
    this.timer.interval = setInterval(function () {
      let delta = Date.now() - runner.start;
      runner.time = Math.floor(delta / 1000);
      // if (runner.timer.seconds > 59) {
      //   start = Date.now();
      //   runner.timer.seconds = 0;
      // }
      document.getElementById("timer").innerText = `${runner.time}`;
    }, 1000);
  },
  handleGameOver: function handleGameOver() {
    this.isOver = true;
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("tetris").style.display = "none";
    document.getElementById("end").style.display = "block";
    clearInterval(this.timer.interval);
    clearInterval(this.game);
  },
};

export default runner;
