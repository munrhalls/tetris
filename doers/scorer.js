export const scorer = {
  score: 0,
  checkLastRow: function () {
    let isScore = true;

    return isScore;
  },
  isScore: function isScore() {
    const isScore = checkLastRow();
    console.log("check");
    return isScore;
  },
  handleScoring: function () {
    if (this.isScore()) this.score += 1;
    console.log("handleScoring", this.score);
  },
};
