// gets rows number with clear class, clears every cell with that of all stuff
import { painter } from "./painter.js";
import { tetroFreezer } from "./tetroFreezer.js";

const lineClearer = {
  clearRow: function clearRow(row) {
    row.setAttribute("frozencount", 0);
    for (let cell of row.children) {
      cell.classList.remove("color");
      cell.classList.remove("frozen");
      cell.classList.remove(cell.classList[1]);
    }
  },
  updateRows: function updateRows(rowCleared) {
    const rowNum = parseInt(rowCleared.id.split("-")[1]);
    this.updateRowCells(rowNum);
  },
  updateRowCells: function updateRowCells(rowNum) {
    let frozen = [...document.getElementsByClassName("frozen")].filter(
      (cell) => parseInt(cell.id.split("-")[1]) < rowNum
    );

    let updatedCells = [];
    for (let cell of frozen) {
      if ([...cell.classList].includes("updated")) continue;
      const coords = [cell.id.split("-")[1], cell.id.split("-")[2]];
      const classList = [...cell.classList];
      painter.resetCell(coords);
      const coordsBelow = [parseInt(coords[0]) + 1, coords[1]];
      const cellBelow = document.getElementById(
        `cellXY-${coordsBelow[0]}-${coordsBelow[1]}`
      );
      painter.resetCell(coordsBelow);
      // fix class list
      cellBelow.classList = classList.join(" ");
      cellBelow.classList.add("updated");
      updatedCells.push(cellBelow);
    }

    for (let cell of updatedCells) {
      cell.classList.remove("updated");
    }
  },
};

export default lineClearer;
