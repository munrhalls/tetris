const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const freezer = {
  frozenTetroes: [],
  frozenLines: [],
  isAtFrozenTetroLeft: function isAtFrozenTetroLeft(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      const cell = document.getElementById(
        `cellXY-${xy[0]}-${parseInt(xy[1]) - 1}`
      );
      if ([...cell.classList].includes("frozen")) return true;
    }
    return false;
  },
  isAtFrozenTetroRight: function isAtFrozenTetroRight(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      const cell = document.getElementById(
        `cellXY-${xy[0]}-${parseInt(xy[1]) + 1}`
      );
      if ([...cell.classList].includes("frozen")) return true;
    }
    return false;
  },
  isAtFrozenTetroBottom: function isAtFrozenTetroBottom(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 1) return;
      if (xy[1] < 0) throw new Error(`Cell outside board: x is ${xy[1]}`);
      if (xy[1] >= columns)
        throw new Error(`Cell outside board: x is ${xy[1]}`);
      const cell = document.getElementById(
        `cellXY-${parseInt(xy[0] + 1)}-${xy[1]}`
      );
      if ([...cell.classList].includes("frozen")) return true;
    }
    return false;
  },
  isCrossingFrozenTetro: function isCrossingFrozenTetro(group) {
    for (let xy of group) {
      if (xy[0] < 1) return;
      if (xy[1] < 0) throw new Error(`Cell outside board: x is ${xy[1]}`);
      if (xy[1] >= columns)
        throw new Error(`Cell outside board: x is ${xy[1]}`);
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      if ([...cell.classList].includes("frozen")) return true;
    }
    return false;
  },
  resetTetro: function resetTetro(xyGroup) {
    xyGroup = null;
  },
  freezeCell: function freezeCell(xy) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
    cell.classList.add("black");
  },
  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      this.freezeCell(xy);
    }
    this.updateFrozenLines(xyGroup);
    this.handleLineClears();
    this.updateFrozenTetroes(xyGroup);
    this.resetTetro(xyGroup);
    return xyGroup;
  },
  updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
    this.frozenTetroes.push(xyGroup);
  },
  getCurrentFrozenLine: function getCurrentFrozenLine(row) {
    return this.frozenLines.find((line) => row === line.num);
  },
  updateFrozenLine: function updateFrozenLine(square) {
    this.frozenLines.push({ num: square[0], frozenCells: [] });
  },
  updateFrozenCell: function updateFrozenCell(currentLine, square) {
    currentLine.frozenCells.push(square[1]);
  },
  newFrozenLine: function newFrozenLine(row) {
    this.frozenLines.push({ num: row, frozenCells: [] });
  },
  updateFrozenLines: function updateFrozenLines(xyGroup) {
    for (let square of xyGroup) {
      let currentLine;

      if (!this.getCurrentFrozenLine(square[0])?.length) {
        this.newFrozenLine(square[0]);
        currentLine = this.frozenLines[this.frozenLines.length - 1];
      } else {
        currentLine = this.getCurrentFrozenLine(square[0]);
      }

      this.updateFrozenCell(currentLine, square);
    }
  },
  testNoFrozenOverlap: function testNoFrozenOverlap() {
    if (this.frozenLines.find((line) => line.frozenCells.length > columns)) {
      throw new Error(
        "More than one frozen tetrominoe occupies the same cell."
      );
    }
  },
  getFullyFrozenLines: function () {
    const lines = this.frozenLines.filter((line) => {
      return line.frozenCells.length === columns;
    });
    return lines;
  },
  sortFullyFrozenLines: function (lines) {
    return lines.sort((a, b) => a.num > b.num);
  },
  handleLineClears: function handleLineClears() {
    if (this.getFullyFrozenLines()?.length) {
      let fullyFrozenLines = this.sortFullyFrozenLines(fullyFrozenLines);
      const markedFullyFrozenLines = this.countNeighbourhood(fullyFrozenLines);
    }
  },
  countNeighbourhood: function countNeighbourhood(lines) {
    let neighboursCounting = [];
    console.log(lines);

    for (let i = 1; i < lines.length; i++) {
      const current = lines[i];
      const prev = lines[i - 1];
      console.log(prev);
    }
  },
};

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 16; i++) {
    mockxyGroup.push([20, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 300);

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([21, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 400);
setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([22, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 500);

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 21; i++) {
    mockxyGroup.push([16, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 700);

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([27, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 800);
// setTimeout(() => {}, 1000);
// setTimeout(() => {}, 1000);
// setTimeout(() => {}, 1000);
