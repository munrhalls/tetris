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

    //store updated arr
    for (let cell of frozen) {
      // coords
      // get cell
      // store classlist
      // reset cell
      // y + 1
      // reset cell
      // add stored classlist
      // add updated classlist
      // push to updated arr
    }
    //loop updated arr
    // out updated class
  },
};

export default lineClearer;
