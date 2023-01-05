export const scorer = {
  score: 0,
  isNonZeroClears: function isNonZeroClears() {
    let isOverZero = false;
    const rows = [...document.getElementsByClassName("row")];

    for (let row of rows) {
      const line = [...row.children];
      let isLineBreak = true;

      for (let cell of line) {
        if (![...cell.classList].includes("frozen")) {
          isLineBreak = false;
          break;
        }
      }
      if (isLineBreak) {
        isOverZero = true;
        break;
      }
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
  isScore: function isScore() {
    const isScore = this.isNonZeroClears();
    console.log("this.isNonZeroClears ->", isScore);
    if (isScore) {
      this.handleLineClears();
    }
    return isScore;
  },
  handleScoring: function () {
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isScore()) this.handleLineClears();
    displayer.innerText = `${this.score}`;
    console.log("handleScoring", this.score);
  },
};
