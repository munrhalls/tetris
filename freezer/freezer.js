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
    this.frozenTetroes.push(xyGroup);
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      cell.classList.add("frozen");
    }
    this.handleFrozenLinesUpdate(xyGroup);

    xyGroup = null;
    return xyGroup;
  },
  handleFrozenLinesUpdate: function handleFrozenLinesUpdate(xyGroup) {
    let rows = this.frozenLines;
    for (let square of xyGroup) {
      let row = rows.find((row) => square[0] === row.num);
      if (!row) {
        rows.push({ num: square[0], frozenCells: [] });
        row = rows.find((row) => square[0] === row.num);
      }
      row.frozenCells.push(square[1]);
      this.checkFrozenLineFull(row);
    }
  },
  checkFrozenLineFull: function checkFrozenLineFull(row) {
    if (row.frozenCells.length === rows - 1) {
      console.log("freeze frozen cells");
    }
  },
};
