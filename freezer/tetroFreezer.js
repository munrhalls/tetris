const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { frozenTracker } from "./frozenTracker.js";
import { frozenMarker } from "./frozenMarker.js";

export const tetroFreezer = {
  frozenTetroes: [],
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
    frozenTracker.handleFrozenLines(xyGroup);
    frozenMarker.handleLineClears();
    this.updateFrozenTetroes(xyGroup);
    this.resetTetro(xyGroup);
    return xyGroup;
  },
  updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
    this.frozenTetroes.push(xyGroup);
  },
  testNoFrozenOverlap: function testNoFrozenOverlap() {
    if (this.frozenLines.find((line) => line.frozenCells.length > columns)) {
      throw new Error(
        "More than one frozen tetrominoe occupies the same cell."
      );
    }
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
  tetroFreezer.freezeTetro(mockxyGroup);
}, 300);
