const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const mover = {
  moveTetroTop: function moveTetroTop(xyGroup) {
    for (let xy of xyGroup) {
      xy[0] = xy[0] - 1;
    }
    return xyGroup;
  },
  moveTetroLeft: function moveTetroLeft(xyGroup) {
    console.log(xyGroup);
    for (let xy of xyGroup) {
      xy[1] = xy[1] - 1;
    }
    return xyGroup;
  },
  moveTetroRight: function moveTetroRight(xyGroup) {
    for (let xy of xyGroup) {
      xy[1] = xy[1] + 1;
    }
    return xyGroup;
  },
  moveTetroBottom: function moveTetroBottom(xyGroup) {
    for (let xy of xyGroup) {
      xy[0] = xy[0] + 1;
    }
    return xyGroup;
  },
};
