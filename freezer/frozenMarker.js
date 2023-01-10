const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { frozenTracker } from "./frozenTracker.js";

export const frozenMarker = {
  getFullyFrozenLines: function () {
    const lines = frozenTracker.frozenLines.filter((line) => {
      return line.frozenCells.length === columns;
    });
    return lines;
  },
  sortFullyFrozenLines: function (lines) {
    return lines.sort((a, b) => a.num > b.num);
  },
  handleLineClears: function handleLineClears() {
    let fullyFrozenLines = this.getFullyFrozenLines();
    if (fullyFrozenLines.length) {
      fullyFrozenLines = this.sortFullyFrozenLines(fullyFrozenLines);
      const markedFullyFrozenLines = this.markGroupedLines(fullyFrozenLines);
    }
  },
  markGroupedLines: function markGroupedLines(lines) {
    lines.sort((a, b) => a.frozenRow > b.frozenRow);
    let groupsList = [];
    let group = [];
    for (let line of lines) {
      let isNextNeighbour;
      let isPrevNeighbour;

      isNextNeighbour = lines.find(
        (item) => item.frozenRow === line.frozenRow + 1
      );
      if (isNextNeighbour) {
        group.push(line);
        continue;
      }

      isPrevNeighbour = lines.find(
        (item) => item.frozenRow === line.frozenRow - 1
      );
      if (isPrevNeighbour) {
        group.push(line);
        continue;
      }

      if (group.length) {
        for (let item of group) {
          item.grouped = group.length;
        }
        group = [];
      }
      if (!group.length) line.grouped = 1;
    }
    console.log(lines);
  },
  markMultipleNeighbours: function (neighbours) {
    neighbours.forEach((line) => (line.neighbours = neighbours.length));
  },
};

// tetroFreezer
// frozenChecker
// frozenMarker
// frozenClearer
// frozenTracker
