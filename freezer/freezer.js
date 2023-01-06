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
    console.log(this.frozenLines);
  },
  handleLineClears: function handleLineClears() {
    let fullLines = this.frozenLines.filter(
      (line) => line.frozenCells.length === columns
    );

    if (!fullLines.length) return;
    fullLines = fullLines.sort((a, b) => a.num > b.num);

    let neighboursCounting = [];
    for (let i = 0; i < fullLines.length; i++) {
      const current = fullLines[i];
      // console.log(current);
    }
  },
};

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 16; i++) {
    mockxyGroup.push([20, i]);
  }
  mockxyGroup[15][0] = 20;
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 16; i < 22; i++) {
    mockxyGroup.push([20, i]);
  }
  mockxyGroup[3][0] = 20;
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([21, i]);
  }
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([22, i]);
  }
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([22, i]);
  }
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([24, i]);
  }
  freezer.freezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([26, i]);
  }
  freezer.freezeTetro(mockxyGroup);
}, 500);
