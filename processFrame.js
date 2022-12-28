let xyGroup = null;
let frozenTetroes = [];
let moveCommand = undefined;
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
  if (!xyGroup) {
    initializeTetro();
  } else {
    if (isGameOver()) return 
    if (isAtBoundBottom()) return freezeTetro();
    if (isAtFrozenTetroBottom()) return freezeTetro();
    unpaintTetro();
    moveTetroBottom();
    paintTetro();
    moveCommand = undefined;
  }
}

initializeMovesInterface();

function initializeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (!xyGroup) return;
    if (e.code === "ArrowLeft") {
      if (isAtBoundLeft()) return;
      if (isAtFrozenTetroLeft()) return freezeTetro();
      unpaintTetro();
      moveTetroLeft();
      paintTetro();
    }
    if (e.code === "ArrowRight") {
      if (isAtBoundRight()) return;
      if (isAtFrozenTetroRight()) return freezeTetro();

      unpaintTetro();
      moveTetroRight();
      paintTetro();
    }
    if (e.code === "ArrowDown") {
      if (isAtBoundBottom()) return freezeTetro();
      if (isAtFrozenTetroBottom()) return freezeTetro();

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
    if (xy[0] + 1 >= rows) return true;
  }
  return false;
}

function isAtFrozenTetroLeft() {
  for (let xy of xyGroup) {
    const cell = document.getElementById(
      `cellXY-${xy[0]}-${parseInt(xy[1]) - 1}`
    );
    if ([...cell.classList].includes("frozen")) return true;
  }
  return false;
}
function isAtFrozenTetroRight() {
  for (let xy of xyGroup) {
    const cell = document.getElementById(
      `cellXY-${xy[0]}-${parseInt(xy[1]) + 1}`
    );
    if ([...cell.classList].includes("frozen")) return true;
  }
  return false;
}
function isAtFrozenTetroBottom() {
  for (let xy of xyGroup) {
    const cell = document.getElementById(
      `cellXY-${parseInt(xy[0] + 1)}-${xy[1]}`
    );
    if ([...cell.classList].includes("frozen")) return true;
  }
  return false;
}
function freezeTetro() {
  frozenTetroes.push(xyGroup);
  for (let xy of xyGroup) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
  }

  xyGroup = null;
}

function isGameOver() {
  let isGameOver = false;
  for (let frozenTetro of frozenTetroes) {
    for (xy of frozenTetro) {
      if (parseInt(xy[0]) < 1) {
        isGameOver = true;
        break;
      }
    }
  }
  return isGameOver;
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

function unpaintTetro(xy) {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.remove("black");
}
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}
function paintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
}
