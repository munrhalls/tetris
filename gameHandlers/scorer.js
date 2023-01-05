export const scorer = {
  score: 0,
  getLineClears: function () {
    let lineClearsList = [];

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
        line.num = lineClearsList.indexOf(line);
        lineClearsList.push(line);
      }
    }

    return lineClearsList;
  },
  handleLineClears: function handleLineClears() {
    let lineClearsList = this.getLineClears();
    console.log(lineClearsList);
    let accumulator = 0;
    let isNeighbour = false;

    for (let i = 0; i < lineClearsList.length; i++) {
      console.log(lineClearsList[i]);
    }
  },
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
  handleScoring: function () {
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isNonZeroClears()) this.handleLineClears();
    displayer.innerText = `${this.score}`;
  },
};

function setUpScorerTests() {
  const rndNums = [4, 5, 6, 8, 9, 12];
  const testRows = [...document.getElementsByClassName("row")];
  rndNums.forEach((num) => {
    let line = testRows[num].children;
    [...line].forEach((cell) => {
      cell.classList.add("orange");
      cell.classList.add("frozen");
    });
  });
}

setTimeout(() => {
  setUpScorerTests();
}, 1000);
