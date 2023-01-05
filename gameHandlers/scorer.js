export const scorer = {
  score: 0,
  checkLineClears: function () {
    let isScore = true;
    const rows = [...document.getElementsByClassName("row")];
    for (let row of rows) {
      const cells = [...row.children];

      for (let cell of cells) {
        if (![...cell.classList].includes("frozen")) isScore = false;
      }
    }

    return isScore;
  },
  isScore: function isScore() {
    const isScore = this.checkLineClears();
    if (isScore) alert("Is SCORE!!!");
    return isScore;
  },
  handleScoring: function () {
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isScore()) this.score += 1;
    displayer.innerText = `${this.score}`;
    console.log("handleScoring", this.score);
  },
};
