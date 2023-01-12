const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));

export const painter = {
  unpaintCell: function unpaintCell(xy) {
    if (!xy) throw new Error("Received no coordinates.");
    if (xy[0] < 0) return;
    if (xy[1] < 0) return;
    if (xy[1] > columns) return;
    let cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.style.innerText = ``;
    cell.style.fontSize = `0px`;
    cell.classList.remove("color");
    cell.classList.remove(xy.color);
  },
  paintCell: function paintCell(xy) {
    if (!xy) throw new Error("Received no coordinates.");
    if (xy[0] < 0) return;
    if (xy[1] < 0)
      throw new Error(`Square out of board in paint cell with ${xy[1]}.`);
    if (xy[1] > columns)
      throw new Error(`Square out of board in paint cell with ${xy[1]}.`);

    let cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("color");
    cell.classList.add(xy.color);
    cell.innerText = `Y:${xy[0]} X:${xy[1]}`;
    cell.style.fontSize = "7px";
  },
  unpaintTetro: function unpaintTetro(xyGroup) {
    for (let xy of xyGroup) {
      this.unpaintCell(xy);
    }
  },
  paintTetro: function paintTetro(xyGroup) {
    for (let xy of xyGroup) {
      this.paintCell(xy);
    }
  },
};
