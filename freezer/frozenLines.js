const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const frozenLines = {
  frozenLines: [],
  handleFrozenLines: function handleFrozenLines(xyGroup) {
    // debug3 - frozen lines is totally wrong, is it here?
    for (let square of xyGroup) {
      const rowNumber = square[0];
      const cellNumber = square[1];
      let currentLine = this.getCurrentFrozenLine(rowNumber);

      if (!currentLine) {
        this.makeNewFrozenLine(rowNumber);
        currentLine = this.frozenLines[this.frozenLines.length - 1];
      } else {
        currentLine = this.getCurrentFrozenLine(rowNumber);
      }

      this.updateFrozenCell(currentLine, cellNumber);
    }
  },
  getCurrentFrozenLine: function getCurrentFrozenLine(row) {
    return this.frozenLines.find((line) => row === line.frozenRow);
  },
  updateFrozenLine: function updateFrozenLine(square) {
    this.frozenLines.push({ num: square[0], frozenCells: [] });
  },
  updateFrozenCell: function updateFrozenCell(currentLine, cellNumber) {
    currentLine.frozenCells.push(cellNumber);
  },
  makeNewFrozenLine: function makeNewFrozenLine(num) {
    this.frozenLines.push({ frozenRow: num, frozenCells: [] });
  },
};
