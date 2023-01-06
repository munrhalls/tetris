const tetris = document.getElementById("tetris");
const rows = 28;
const columns = 22;
const standardSquare = 20;
const grid = [];
localStorage.setItem("isGameOver", "false");
tetris.setAttribute("rows", `${rows}`);
tetris.setAttribute("columns", `${columns}`);

export default async function makeBoard() {
  setTimeout(() => {
    for (let x = 0; x < rows; x++) {
      grid.push([]);
      const row = document.createElement("div");
      row.style.height = `${standardSquare}px`;
      row.classList.add(`row`);
      row.id = `x-${x}`;

      for (let y = 0; y < columns; y++) {
        grid[grid.length - 1].push(y);
        const cell = document.createElement("div");
        cell.style.height = `${standardSquare}px`;
        cell.style.width = `${standardSquare}px`;
        cell.classList.add(`cell`);
        cell.id = `cellXY-${x}-${y}`;
        // T E S T
        row.appendChild(cell);
      }
      tetris.appendChild(row);
    }

    // setTimeout(() => {}, 500);
    function TEST_ADD_FROZEN_TO_ROW() {
      const rows = document.getElementsByClassName("row");

      const row = [...rows][20];
      let cells = [...row.children];
      cells.forEach((cell) => {
        cell.classList.add("frozen");
        cell.classList.add("orange");
      });
    }
    TEST_ADD_FROZEN_TO_ROW();
  }, 100);
}
