import requestAnimFrame from "./../displaying/animateFrame.js";
import repaintFrame from "./../displaying/repaintFrame.js";

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
  checkGameOver: function checkGameOver() {
    const firstRow = document.getElementsByClassName("row first")[0];
    for (let cell of [...firstRow.children]) {
      if ([...cell.classList].includes("frozen")) {
        return this.handleGameOver();
      }
    }
  },
  handleGameOver: function handleGameOver() {
    this.isOver = true;
    document.getElementById("tetris").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    clearInterval(this.game);
  },
};

export default runner;
