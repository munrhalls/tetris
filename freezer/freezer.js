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
  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      cell.classList.add("frozen");
      cell.classList.add("black");
    }
    this.frozenTetroes.push(xyGroup);
    this.handleFrozenLines(xyGroup);

    xyGroup = null;
    return xyGroup;
  },
  handleFrozenLines: function handleFrozenLines(xyGroup) {
    this.updateFrozenLines(xyGroup);
    this.handleLineClears();
  },
  updateFrozenLines: function updateFrozenLines(xyGroup) {
    for (let square of xyGroup) {
      let currentLine = this.frozenLines.find((line) => square[0] === line.num);
      if (!currentLine) {
        this.frozenLines.push({ num: square[0], frozenCells: [] });
        currentLine = this.frozenLines[this.frozenLines.length - 1];
      }
      currentLine.frozenCells.push(square[1]);
    }

    if (this.frozenLines.find((line) => line.num > columns)) {
      throw new Error(
        "More than one frozen tetrominoe occupies the same cell."
      );
    }
  },
  handleLineClears: function handleLineClears() {
    let fullLines = this.frozenLines.filter((line) => {
      return line.frozenCells.length === columns;
    });

    if (fullLines.length) {
      fullLines = fullLines.sort((a, b) => a.num > b.num);

      let neighboursCounting = [];
      for (let i = 1; i < fullLines.length; i++) {
        const current = fullLines[i];
        const prev = fullLines[i - 1];
      }
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

// setTimeout(() => {}, 1000);
// setTimeout(() => {}, 1000);
// setTimeout(() => {}, 1000);
