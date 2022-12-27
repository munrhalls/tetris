let xyGroup = null;
let frozenGroups = [];
let moveCommand = undefined;
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
  if (!xyGroup) {
    initializeTetro();
  } else {
    if (isAtBoundBottom()) return;
    unpaintTetro();
    moveTetroBottom();
    paintTetro();
    moveCommand = undefined;
  }
}

initializeMovesInterface();

function initializeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (e.code === "ArrowLeft") {
      if (isAtBoundLeft()) return;
      unpaintTetro();
      moveTetroLeft();
      paintTetro();
    }
    if (e.code === "ArrowRight") {
      if (isAtBoundRight()) return;
      unpaintTetro();
      moveTetroRight();
      paintTetro();
    }
    if (e.code === "ArrowDown") {
      if (isAtBoundBottom()) return;
      unpaintTetro();
      moveTetroBottom();
      paintTetro();
    }
  });
}

function initializeTetro() {
  xyGroup = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 4],
  ];

  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
}

function unpaintTetro(xy) {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.remove("black");
}
function isAtBoundLeft() {
  for (let xy of xyGroup) {
    if (xy[1] - 1 < 0) return true;
  }
  return false;
}
function isAtBoundRight() {
  for (let xy of xyGroup) {
    if (xy[1] + 1 >= columns) return true;
  }
  return false;
}
function isAtBoundBottom() {
  for (let xy of xyGroup) {
    const cell = document.getElementById(
      `cellXY-${parseInt(xy[0] + 2)}-${xy[1]}`
    );
    cell.style.backgroundColor = "blue";
    const cell2 = document.getElementById(
      `cellXY-${parseInt(xy[0] + 1)}-${xy[1]}`
    );
    cell2.style.backgroundColor = "";
    console.log(cell);
    if (xy[0] + 1 >= rows) return true;
  }
  return false;
}
function moveTetroLeft() {
  for (let xy of xyGroup) {
    xy[1] = xy[1] - 1;
  }
}
function moveTetroRight() {
  for (let xy of xyGroup) {
    xy[1] = xy[1] + 1;
  }
}
function moveTetroBottom() {
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
