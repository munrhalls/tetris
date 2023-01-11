const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

import { frozenTracker } from "./frozenTracker.js";
import { frozenMarker } from "./frozenMarker.js";
import { painter } from "./../displaying/painter.js";

export const tetroFreezer = {
  frozenTetroes: [],
  frozenLines: [],
  resetTetro: function resetTetro(xyGroup) {
    xyGroup = null;
  },
  freezeCell: function freezeCell(xy) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
    cell.classList.add("purple");
  },
  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      this.freezeCell(xy);
    }
    this.updateFrozenTetroes(xyGroup);
  },
  updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
    this.frozenTetroes.push(xyGroup);
  },
};
