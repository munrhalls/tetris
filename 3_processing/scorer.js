const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

const scorer = {
  processLineClears: function processLineClears(newlyFrozen) {
    let ymax = 0;
    let ymin = rows + 1;
    for (let square of newlyFrozen) {
      if (square[0] > ymax) ymax = square[0];
      if (square[0] < ymin) ymin = square[0];
    }
    console.log(ymin, ymax);
  },
};

export default scorer;
