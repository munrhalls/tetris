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
    let frozenRows = [...document.getElementsByClassName("row")].filter(
      (row) => {
        const isWithFrozenCells = parseInt(row.getAttribute("frozencount")) > 0;
        const isAboveRowCleared = parseInt(row.id.split("-")[1] > rowNum);
      }
    );

    let rowsBelow = [];
    let frozenCounts = [];

    for (let row of frozenRows) {
      const rowBelow = document.getElementById(
        `x-${parseInt(row.id.split("-")[1])}`
      );
    }
    // push row after to rows after store
    // push row frozen count to store
    // set row count to 0

    // loop rows after
    // set row frozen count to frozen counts [i]
    this.updateRowCells(rowNum);
  },
  updateRowCells: function updateRowCells(rowNum) {
    let frozenCells = [...document.getElementsByClassName("frozen")].filter(
      (cell) => parseInt(cell.id.split("-")[1]) < rowNum
    );

    let cells = [];

    for (let cell of frozenCells) {
      let coords = [
        parseInt(cell.id.split("-")[1]),
        parseInt(cell.id.split("-")[2]),
      ];
      painter.resetCell(coords);
      //   let cellBelow = document.getElementById(
      //     `cellXY-${coords[1] + 1}-${coords[2]}`
      //   );
      //   cells.push(cellBelow);
    }

    // for (let )
  },
};

// let updatedCells = [];

// for (let cell of frozen) {
//   if ([...cell.classList].includes("updated")) continue;
//   const coords = [
//     parseInt(cell.id.split("-")[1]),
//     parseInt(cell.id.split("-")[2]),
//   ];
//   const classList = [...cell.classList];
//   painter.resetCell(coords);

//   const coordsBelow = [parseInt(coords[0] + 1), parseInt(coords[1])];
//   coordsBelow.color = classList[3];
//   const cellBelow = document.getElementById(
//     `cellXY-${coordsBelow[0]}-${coordsBelow[1]}`
//   );
//   painter.resetCell(coordsBelow);
//   //   tetroFreezer.freezeTetro(coordsBelow);
//   cellBelow.classList.add("updated");
//   updatedCells.push(cellBelow);
// }

// for (let cell of updatedCells) {
//   cell.classList.remove("updated");
// }

export default lineClearer;
