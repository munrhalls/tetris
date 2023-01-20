const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

const scorer = {
  markRowByFrozenCount: function markRowByFrozenCount(rowNum) {
    const row = document.getElementById(`x-${rowNum}`);
    let frozenCount = parseInt(row.getAttribute("frozencount")) + 1;
    row.setAttribute("frozencount", frozenCount);
    if (parseInt(frozenCount) === row.children.length) this.handleScoring(row);
  },
  handleScoring: function handleScoring(row) {
    console.log("LINE CLEAR", row);
  },
};

export default scorer;
