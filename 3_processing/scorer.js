const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import lineClearer from "../4_displaying/lineClearer.js";

const scorer = {
  score: 0,
  markRowByFrozenCount: function markRowByFrozenCount(rowNum) {
    const row = document.getElementById(`x-${rowNum}`);
    let frozenCount = parseInt(row.getAttribute("frozencount")) + 1;
    row.setAttribute("frozencount", frozenCount);
    if (parseInt(frozenCount) === row.children.length) {
      row.setAttribute("frozencount", 0);
      this.handleScoring(row);
    }
  },
  handleScoring: function handleScoring(row) {
    const scoreDisplay = document.getElementById("scoreDisplay");
    this.score += columns;
    scoreDisplay.innerText = this.score;
    lineClearer.clearRow(row);
    lineClearer.updateRows(row);
  },
  reset: function () {
    this.score = 0;
  },
};

export default scorer;
