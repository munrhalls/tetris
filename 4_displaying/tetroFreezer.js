const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import scorer from "../3_processing/scorer.js";

export const tetroFreezer = {
  frozenTetroes: [],
  frozenLines: [],
  freezeCell: function freezeCell(xy) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    scorer.markRowByFrozenCount(xy[0]);
    cell.classList.add("frozen");
    cell.classList.add("purple");
    cell.classList.add("color");
  },
  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      this.freezeCell(xy);
    }
    this.updateFrozenTetroes(xyGroup);
    // this.handleLineClears();
  },
  handleLineClears: function handleLineClears() {
    // on freeze, loop all rows
    // get length for every row, check if equal to columns
    const rows = [...document.getElementsByClassName("row")];
    for (let row of rows) {
      const frozenCells = [...row.children].filter((cell) =>
        [...cell.classList].includes("frozen")
      );

      if (columns === frozenCells.length) {
        for (let cell of frozenCells) {
          const domCell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
          domCell.classList.remove("frozen");
          let index = [...domCell.classList].indexOf("color");
          [...domCell.classList][index + 1] = "";
        }
      }
    }
  },
  updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
    this.frozenTetroes.push(xyGroup);
  },
};
