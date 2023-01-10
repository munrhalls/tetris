export const frozenClearer = {
  clearLines: function clearLines(lines) {
    lines = lines.filter((line) => line.isFullyFrozen === false);
    return lines;
  },
  clearCells: function clearCells(lines, xyGroup) {
    let cellsCleared = [];
    let linesToClear = lines.filter((line) => line.isFullyFrozen === true);
    for (let line of linesToClear) {
      for (let position of line) {
        console.log(position);
      }
    }
    // iterate every line
    // every line, store cell
    // update y with line frozen row
    // iterate over line
    // every position updates cell x
    // get painter unpaint
    // unpaint that cell
    //
    return cells;
  },
  clearFrozenTetroes: function clearFrozenTetroes(xyGroup) {
    return xyGroup;
  },
};

// frozen clearer
// returns cleared lines for tracker to update
// returns cleared cells for frozen tetroes to update
