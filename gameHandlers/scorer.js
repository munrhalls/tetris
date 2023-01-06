const rows = parseInt(tetris.getAttribute("columns"));
const columns = parseInt(tetris.getAttribute("columns"));

export const scorer = {
  score: 0,
  xyGroup: null,

  popFrozenLine: function (line) {
    for (let cell of line) {
      cell.classList.remove("frozen");
      console.log(this.xyGroup.color);
      cell.classList.remove(this.xyGroup.color);
    }
  },
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
        line.num = rows.indexOf(row);
        lineClearsList.push(line);
      }
    }
    return lineClearsList;
  },
  handleLineClears: function handleLineClears() {
    let scoreMultiplier = 1;
    let lineClearsList = this.getLineClears();
    console.log(lineClearsList);
    let accumulator = [];

    for (let i = 0; i < lineClearsList.length; i++) {
      let line = lineClearsList[i];
      let prev;
      let next;

      if (lineClearsList[i + 1]) next = lineClearsList[i + 1].num;
      if (i > 0) prev = lineClearsList[i - 1].num;

      const isNeighbour = prev === line.num - 1 || next === line.num + 1;

      if (isNeighbour) {
        accumulator.push(line);
      }
      
      if (!isNeighbour) {
        if (accumulator.length > 0) {
          scoreMultiplier = accumulator.length + 1;

          for (let withNeighbourLine of accumulator) {
            this.popFrozenLine(withNeighbourLine);
          }
          this.score = this.score + columns * scoreMultiplier;
          accumulator = [];
        } else {
          this.popFrozenLine(line);
        }
      }
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
  handleScoring: function (xyGroup) {
    this.xyGroup = xyGroup;
    // TEST
    xyGroup.color = "orange";
    // TEST
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isNonZeroClears()) this.handleLineClears();
    displayer.innerText = `${this.score}`;
  },
};

function setUpScorerTests() {
  const rndNums = [4, 5, 6, 8, 9, 12];
  console.log(rndNums, "neighbours: ", "4, 5, 6///8, 9");
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
