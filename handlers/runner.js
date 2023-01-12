const runner = {
  runGame: false,
  checkGameOver: function checkGameOver() {
    if (this.isGameOver()) {
      this.handleGameOver();
    }
  },
  handleGameOver: function handleGameOver() {
    document.getElementById("tetris").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    this.cancelAnimation(this.runGame);
  },
  cancelAnimation: function cancelAnimation() {
    clearInterval(this.runGame);
  },
  isGameOver: function isGameOver() {
    let isGameOver = false;
    const firstRow = document.getElementsByClassName("row first")[0];
    for (let cell of [...firstRow.children]) {
      if ([...cell.classList].includes("frozen")) {
        return this.handleGameOver();
      }
    }
    return isGameOver;
  },
};

export default runner;
