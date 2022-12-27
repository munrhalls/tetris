export default async function makeBoard() {
  const tetris = document.getElementById("tetris");
  const rows = 24;
  const columns = 16;
  const standardSquare = 20;
  const grid = [];
  tetris.setAttribute("rows", rows);
  tetris.setAttribute("columns", columns);

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
        row.appendChild(cell);
      }
      tetris.appendChild(row);
    }
  }, 100);
}
