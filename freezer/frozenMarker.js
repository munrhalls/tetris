const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { frozenTracker } from "./frozenTracker.js";

export const frozenMarker = {
  markedLines: [],
  initializeMarks: function (lines) {
    this.markedLines = lines;
    for (let line of lines) {
      if (!line.hasOwnProperty("isFullyFrozen")) line.isFullyFrozen = false;
      if (!line.hasOwnProperty("groupCount")) line.groupCount = 1;
    }
  },
  markLines: function markLines(lines) {
    this.initializeMarks(lines);
    this.markFullyFrozenLines();
    this.markGroupCounts();
    console.log(this.markedLines);
    return this.markedLines;
  },
  markFullyFrozenLines: function markFullyFrozenLines() {
    let fullyFrozen = this.markedLines.forEach((line) => {
      if (line.frozenCells.length === columns) line.isFullyFrozen = true;
    });
  },
  markGroupCounts: function markGroupCounts() {
    let lines = this.markedLines.filter((line) => line.isFullyFrozen === true);
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
          item.groupCount = group.length;
        }
        group = [];
      }
      if (!group.length) line.groupCount = 1;
    }
  },
};

// tetroFreezer
// frozenChecker
// frozenMarker
/// marks lines, properties
// returns lines, all marked
// frozenClearer
// frozenTracker
