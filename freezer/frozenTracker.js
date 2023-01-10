const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const frozenTracker = {
  frozenLines: [],
  updateFrozenLines: function updateFrozenLines(xyGroup) {
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
    return this.frozenLines;
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
  updateAfterClear: function updateAfterClear(lines) {
    this.frozenLines = lines;
  },
};
