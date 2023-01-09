const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { frozenLines } from "./frozenLines.js";

export const lineClears = {
  getFullyFrozenLines: function () {
    //debug2 - frozen lines is completely wrong
    const lines = frozenLines.frozenLines.filter((line) => {
      return line.frozenCells.length === columns;
    });
    return lines;
  },
  sortFullyFrozenLines: function (lines) {
    return lines.sort((a, b) => a.num > b.num);
  },
  handleLineClears: function handleLineClears() {
    let fullyFrozenLines = lineClears.getFullyFrozenLines();
    if (fullyFrozenLines.length) {
      fullyFrozenLines = this.sortFullyFrozenLines(fullyFrozenLines);
      const markedFullyFrozenLines = this.countNeighbourLines(fullyFrozenLines);
      console.log(markedFullyFrozenLines);
    }
  },
  countNeighbourLines: function countNeighbourLines(lines) {
    let neighbours = lines.forEach((line) => {
      let neighbours = [];
    });
    console.log(neighbours);
  },
  markMultipleNeighbours: function (neighbours) {
    neighbours.forEach((line) => (line.neighbours = neighbours.length));
  },
};
