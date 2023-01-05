export const scorer = {
  score: 0,
  getLineClears: function () {
    let lineClearsList = [];

    // const rows = [...document.getElementsByClassName("row")];
    const testRows = [...document.getElementsByClassName("row")];
    let count = 3;

    // for (let row of rows) {
    for (let row of testRows) {
      count++;
      if (count > 15) break;
      const line = [...row.children];
      let isLineBreak = true;
      for (let cell of line) {
        cell.classList.add("frozen");
        cell.classList.add("orange");
        console.log(cell);
        if (![...cell.classList].includes("frozen"))
          return (isLineBreak = false);
      }

      if (isLineBreak) lineClearsList.push(line);
    }

    return lineClearsList;
  },
  handleLineClears: function handleLineClears() {
    let lineClearsList = this.getLineClears();
    let accumulator = 0;
    let isNeighbour = false;

    for (let i = 0; i < lineClearsList.length; i++) {
      console.log(lineClearsList[i]);
    }

    console.log(lineClears);
  },
  isNonZeroClears: function isNonZeroClears() {
    let isOverZero = false;
    const rndNums = [4, 5, 6, 8, 9, 12];
    const testRows = [...document.getElementsByClassName("row")];
    rndNums.forEach((num) => {
      let line = [...testRows[num].children];
      line.forEach((line) => {
        line.classList.add("orange");
      });
    });

    for (let row of testRows) {
      const line = [...row.children];
      let isLineBreak = true;

      for (let cell of line) {
        if (![...cell.classList].includes("frozen")) {
          isLineBreak = false;
          break;
        }
      }
      console.log(isLineBreak);
      if (isLineBreak) {
        isOverZero = true;
        break;
      }
    }
    // const rows = [...document.getElementsByClassName("row")];

    // for (let row of rows) {
    //   const line = [...row.children];
    //   let isLineBreak = true;

    //   for (let cell of line) {
    //     if (![...cell.classList].includes("frozen")) {
    //       isLineBreak = false;
    //       break;
    //     }
    //   }
    //   console.log(isLineBreak);
    //   if (isLineBreak) {
    //     isOverZero = true;
    //     break;
    //   }
    // }

    return isOverZero;
  },
  handleScoring: function () {
    const displayer = document.getElementById("scoreDisplayer");
    if (this.isNonZeroClears()) this.handleLineClears();
    displayer.innerText = `${this.score}`;
  },
};
