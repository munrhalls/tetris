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
    for (let frozenTetro of tetroFreezer.frozenTetroes) {
      for (let xy of frozenTetro) {
        if (parseInt(xy[0]) < 1) {
          isGameOver = true;
          break;
        }
      }
    }
    return isGameOver;
  },
};

export default runner;
