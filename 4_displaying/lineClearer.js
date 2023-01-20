// gets rows number with clear class, clears every cell with that of all stuff
const lineClearer = {
  clearRow: function clearRows(row) {
    row.setAttribute("frozencount", 0);
    for (let cell of row.children) {
      cell.classList.remove("color");
      cell.classList.remove("frozen");
      cell.classList.remove(cell.classList[1]);
    }
  },
};

export default lineClearer;
