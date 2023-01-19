import requestAnimFrame from "./../4_displaying/animateFrame.js";
import repaintFrame from "./../4_displaying/repaintFrame.js";
import checker from "./../3_processing/checker.js";

const runner = {
  game: false,
  isOver: false,
  frequency: 100,
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
    clearInterval(this.game);
  },
  handleTimer: function handleTimer() {
    var start = Date.now();
    let minutes = 0;
    let seconds = 0;
    setInterval(function () {
      const timer = document.getElementById("timer");
      let delta = Date.now() - start;
      seconds = Math.floor(delta / 1000);

      if (seconds > 59) {
        start = Date.now();
        minutes++;
        seconds = 0;
      }
      timer.innerText = `${minutes}:${seconds}`;
    }, 1000);
  },
  handleGameOver: function handleGameOver() {
    this.isOver = true;
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("pause").classList.add("hidden");
    document.getElementById("tetris").style.display = "none";
    document.getElementById("end").style.display = "block";
    clearInterval(this.game);
  },
};

export default runner;
