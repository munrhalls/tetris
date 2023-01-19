const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import runner from "../2_running/runner.js";

const checker = {
  checkGameOver: function checkGameOver() {
    const firstRow = document.getElementsByClassName("row first")[0];
    for (let cell of [...firstRow.children]) {
      if ([...cell.classList].includes("frozen")) {
        return runner.handleGameOver();
      }
    }
  },
  isAtBoundLeft: function isAtBoundLeft(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[1] - 1 < 0) return true;
    }
    return false;
  },
  isAtBoundRight: function isAtBoundRight(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[1] + 1 >= columns) return true;
    }
    return false;
  },
  isAtBoundBottom: function isAtBoundBottom(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] + 1 >= rows) return true;
    }
    return false;
  },
};

export default checker;
