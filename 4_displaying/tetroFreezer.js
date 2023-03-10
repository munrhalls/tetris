const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import scorer from "../3_processing/scorer.js";

export const tetroFreezer = {
  freezeCell: function freezeCell(xy) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
    cell.classList.add("color");
    scorer.markRowByFrozenCount(xy[0]);
  },

  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      this.freezeCell(xy);
    }
  },
};
