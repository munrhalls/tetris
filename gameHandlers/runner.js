export const runner = {
  runGame: false,
  handleGameOver: function handleGameOver() {
    document.getElementById("tetris").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    this.cancelAnimation(this.runGame);
  },
  cancelAnimation: function cancelAnimation() {
    clearInterval(this.runGame);
    // window.runGame = false;
  },
};
