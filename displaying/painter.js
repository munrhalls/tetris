export const painter = {
  unpaintCell: function unpaintCell(xy) {
    if (xy[0] < 0) return;
    if (xy[1] < 0) return;
    if (xy[1] > columns) return;
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.innerText = ``;
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = `0px`;

    document
      .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
      .classList.remove(xyGroup.color);
  },
  paintCell: function paintCell(xy) {
    if (xy[0] < 0) return;
    if (xy[1] < 0)
      throw new Error(`Square out of board in paint cell with ${xy[1]}.`);
    if (xy[1] > columns)
      throw new Error(`Square out of board in paint cell with ${xy[1]}.`);

    document
      .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
      .classList.add(xyGroup.color);
    document.getElementById(
      `cellXY-${xy[0]}-${xy[1]}`
    ).innerText = `Y:${xy[0]} X:${xy[1]}`;
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = "7px";
  },
};
