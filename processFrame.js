const tetris = document.getElementById("tetris");
let xyGroup = null;
let frozenGroups = [];

export default function processFrame() {
  if (!xyGroup) {
    initializeTetro();
  } else {
    unpaintTetro();
    moveTetro();
    paintTetro();
  }
}

function initializeTetro() {
  xyGroup = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
}

function unpaintTetro() {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.remove("black");
}
function moveTetro() {
  for (let xy of xyGroup) {
    xy[0] = xy[0] + 1;
  }
}
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}
function paintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
}

function updateTetro() {}
