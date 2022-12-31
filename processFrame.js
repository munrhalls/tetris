import makeNewTetro from "./makeNewTetro.js";
let xyGroup = null;

let frozenTetroes = [];
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
  console.log("Game runs");
  if (isGameOver()) return localStorage.setItem("isGameOver", "true");

  if (!xyGroup) {
    // xyGroup = makeNewTetro();
    // TEMPORARILY, TESTING ROTATION
    xyGroup = [
      [12, 10],
      [13, 10],
      [14, 10],
      [14, 11],
      [15, 11],
      [16, 11],
      [17, 11],
      [18, 11],
      [19, 11],
      [20, 11],
    ];

    xyGroup.color = "blue";
  } else {
    if (isAtBoundBottom()) return freezeTetro();
    if (isAtFrozenTetroBottom()) return freezeTetro();
    unpaintTetro();
    moveTetroBottom();
    paintTetro();
  }
}

// tests
// testFlipY();

initializeMovesInterface();

const clone = (items) =>
  items.map((item) => (Array.isArray(item) ? clone(item) : item));

function initializeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (!window.runGame) return;
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

    if (e.code === "KeyW") {
      unpaintTetro();
      flipTetroY(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyA") {
      unpaintTetro();
      rotateTetroCounterClockwise();
      paintTetro();
    }

    if (e.code === "KeyD") {
      unpaintTetro();
      rotateTetroClockwise();
      paintTetro();
    }
  });
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
    if (xy[0] < 0) return;
    const cell = document.getElementById(
      `cellXY-${xy[0]}-${parseInt(xy[1]) - 1}`
    );
    if ([...cell.classList].includes("frozen")) return true;
  }
  return false;
}
function isAtFrozenTetroRight() {
  for (let xy of xyGroup) {
    if (xy[0] < 0) return;
    const cell = document.getElementById(
      `cellXY-${xy[0]}-${parseInt(xy[1]) + 1}`
    );
    if ([...cell.classList].includes("frozen")) return true;
  }
  return false;
}
function isAtFrozenTetroBottom() {
  for (let xy of xyGroup) {
    if (xy[0] < 1) return;
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
    if (xy[0] < 0) return;
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
  }

  xyGroup = null;
}

function isGameOver() {
  let isGameOver = false;
  for (let frozenTetro of frozenTetroes) {
    for (let xy of frozenTetro) {
      if (parseInt(xy[0]) < 1) {
        console.log(
          frozenTetroes,
          "frozenTetroes, @isGameOver function, inside parseInt(xy[0]) < 1 if check"
        );
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

function testFlipY() {
  let test_xyGroup = makeNewTetro();
  const ySort_before = test_xyGroup.sort((a, b) => a[0] > b[0]);
  let yMin_before = ySort_before[0][0];
  const ySort_after = test_xyGroup.sort((a, b) => a[0] > b[0]);
  let yMin_after = ySort_after[0][0];
  if (yMin_before !== yMin_after) {
    console.log("Before: " + yMin_before + " After: " + yMin_after);
    throw new Error("Flipping moves tetro forward.");
  }
}
function flipTetroY(xyGroup) {
  const sort = xyGroup.sort((a, b) => a[0] > b[0]);
  const min = sort[0][0];
  const max = sort[sort.length - 1][0];
  const height = max - min;
  const mid = min + height / 2;

  const belowMid = sort.filter((xy) => {
    return xy[0] < mid;
  });
  const aboveMid = sort.filter((xy) => {
    return xy[0] > mid;
  });

  for (let xy of belowMid) {
    console.log(xy, "<mid", mid);
  }
  for (let xy of aboveMid) {
    console.log(xy, ">mid", mid);
  }
}

function rotateTetroCounterClockwise() {
  if (!xyGroup.rotate) xyGroup.rotate = 1;
  xyGroup.rotate -= 1;
  if (xyGroup.rotate < 1) xyGroup.rotate = 4;
}

function rotateTetroClockwise() {
  console.log("rotate clockwise");
  if (!xyGroup.rotate) xyGroup.rotate = 1;
  xyGroup.rotate += 1;
  if (xyGroup.rotate > 4) xyGroup.rotate = 1;
  rotateTetro();
}
function unpaintTetro() {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  if (xy[0] < 0) return;
  document
    .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
    .classList.remove(xyGroup.color);
}
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}
function paintCell(xy) {
  if (xy[0] < 0) return;
  document
    .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
    .classList.add(xyGroup.color);
}
