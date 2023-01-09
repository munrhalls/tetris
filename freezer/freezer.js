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
    return this.frozenLines.find((line) => row === line.frozenRow);
  },
  updateFrozenLine: function updateFrozenLine(square) {
    this.frozenLines.push({ num: square[0], frozenCells: [] });
  },
  updateFrozenCell: function updateFrozenCell(currentLine, cellNumber) {
    currentLine.frozenCells.push(cellNumber);
  },
  makeNewFrozenLine: function makeNewFrozenLine(num) {
    this.frozenLines.push({ frozenRow: num, frozenCells: [] });
  },
  updateFrozenLines: function updateFrozenLines(xyGroup) {
    // debug3 - frozen lines is totally wrong, is it here?
    for (let square of xyGroup) {
      const rowNumber = square[0];
      const cellNumber = square[1];
      let currentLine = this.getCurrentFrozenLine(rowNumber);

      if (!currentLine) {
        this.makeNewFrozenLine(rowNumber);
        currentLine = this.frozenLines[this.frozenLines.length - 1];
      } else {
        currentLine = this.getCurrentFrozenLine(rowNumber);
      }

      this.updateFrozenCell(currentLine, cellNumber);
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
    //debug2 - frozen lines is completely wrong
    const lines = this.frozenLines.filter((line) => {
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




setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([20, i]);
    mockxyGroup.push([21, i]);
    mockxyGroup.push([22, i]);

    mockxyGroup.push([24, i]);
  }
  for (let i = 5; i < 16; i++) {
    mockxyGroup.push([17, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 300);
