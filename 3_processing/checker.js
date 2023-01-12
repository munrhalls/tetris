const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const checker = {
  isAtBoundLeft: function isAtBoundLeft(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[1] - 1 < 0) return true;
    }
    return false;
  },
  isAtBoundRight: function isAtBoundRight(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[1] + 1 >= columns) return true;
    }
    return false;
  },
  isAtBoundBottom: function isAtBoundBottom(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] + 1 >= rows) return true;
    }
    return false;
  },
};
