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
  seconds: [0],
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
    runner.timer.pause = Date.now();
    clearInterval(this.timer.interval);
    clearInterval(this.game);
  },
  handleTimer: function handleTimer() {
    // option - have two counts, after pause, run the 2nd count
    // option - hardcode it
    // option

    // let start = Date.now();
    this.timer.interval = setInterval(function () {
      // let delta = Date.now() - start;
      // let gameSeconds = Math.floor(delta / 1000);
      // console.log(gameSeconds);
      // runner.seconds = runner.seconds + gameSeconds;
      // if (runner.timer.seconds > 59) {
      //   start = Date.now();
      //   runner.timer.seconds = 0;
      // }
      // document.getElementById("timer").innerText = `${seconds}`;
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
