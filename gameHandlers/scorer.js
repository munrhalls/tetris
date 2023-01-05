export const scorer = {
  score: 0,
  checkForAnyLinerClear: function checkForAnyLinerClear() {
    let isOverZero = false;

    const rows = [...document.getElementsByClassName("row")];

    for (let row of rows) {
      const line = [...row.children];
      let isLineBreak = true;
      for (let cell of line) {
        if (![...cell.classList].includes("frozen"))
          return (isLineBreak = false);
      }

      if (isLineBreak) return (isOverZero = true);
    }

    return isOverZero;
  },
  getLineClears: function () {
    let lineClears = [];

    const rows = [...document.getElementsByClassName("row")];

    for (let row of rows) {
      const line = [...row.children];
      let isLineBreak = true;
      for (let cell of line) {
        if (![...cell.classList].includes("frozen"))
          return (isLineBreak = false);
      }

      if (isLineBreak) lineClears.push(line);
    }

    return lineClears;
  },
  handleLineClears: function handleLineClears() {
    let lineClears = this.getLineClears();
    console.log(lineClears);
  },
  updateScore: function () {
    this.handleLineClears();
    return this.score;
  },
  isScore: function isScore() {
    const isScore = this.checkForAnyLinerClear();
    if (isScore) {
      this.updateScore();
    }
    return isScore;
  },
  handleScoring: function () {
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isScore()) this.score += 1;
    displayer.innerText = `${this.score}`;
    console.log("handleScoring", this.score);
  },
};
