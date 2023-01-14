import requestAnimFrame from "./../4_displaying/animateFrame.js";
import repaintFrame from "./../4_displaying/repaintFrame.js";
import checker from "./../3_processing/checker.js";

const runner = {
  game: false,
  isOver: false,
  runGame: function runGame(frequency) {
    tetris.style.display = "block";
    gameOver.style.display = "none";

    this.game = setInterval(function () {
      if (this.isOver) return runner.handleGameOver();
      requestAnimFrame(repaintFrame);
    }, frequency);
  },
  stopGame: function stopGame() {
    clearInterval(this.game);
  },
  handleGameOver: function handleGameOver() {
    this.isOver = true;
    document.getElementById("tetris").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    clearInterval(this.game);
  },
};

export default runner;
