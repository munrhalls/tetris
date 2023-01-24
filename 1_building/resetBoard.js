function resetBoard() {
  let rows = [...tetris.children];
  for (let row of rows) {
    row.setAttribute("frozencount", 0);
    let cells = [...row.children];
    for (let cell of cells) {
      cell.classList = [];
      cell.classList.add("cell");
    }
  }
}

export default resetBoard;
