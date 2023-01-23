import processor from "../3_processing/processor.js";
import { painter } from "./painter.js";
import { tetroFreezer } from "./tetroFreezer.js";

const lineClearer = {
  clearRow: function clearRow(row) {
    row.setAttribute("frozencount", 0);
    for (let cell of row.children) {
      painter.resetCell([cell.id.split("-")[1], cell.id.split("-")[2]]);
    }
  },
  updateRows: function updateRows(row) {
    const clearNum = parseInt(row.id.split("-")[1]);
    const cellNums = [...Array(row.children.length).keys()];
    console.log(cellNums);

    let moveRows = [...document.getElementsByClassName("row")].filter(
      (row) =>
        parseInt(row.id.split("-")[1]) < clearNum &&
        row.getAttribute("frozencount") > 0
    );

    let moveRowNums = moveRows.map((row) => parseInt(row.id.split("-")[1]));
    moveRowNums.sort((a, b) => b > a);
    for (let rowNum of moveRowNums) {
      for (let cellNum of cellNums) {
        console.log(cellNum);
        this.updateCell(rowNum, cellNum);
      }
    }
  },
  updateCell: function updateCell(rowNum, cellNum) {
    const cell = document.getElementById(`cellXY-${rowNum}-${cellNum}`);
    const classList = [...cell.classList];
    cell.classList = [];
    cell.classList.add("cell");
    const cellBelow = document.getElementById(
      `cellXY-${rowNum + 1}-${cellNum}`
    );
    cellBelow.classList = [];
    cellBelow.classList = [...classList].join(" ");
  },
};

export default lineClearer;
