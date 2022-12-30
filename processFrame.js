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
      [10, 10],
      [11, 10],
      [12, 10],
      [12, 11],
      [12, 12],
      [12, 13],
      [13, 10],
    ];

    xyGroup.color = "blue";
  } else {
    if (isAtBoundBottom()) return freezeTetro();
    if (isAtFrozenTetroBottom()) return freezeTetro();
    unpaintTetro();
    moveTetroBottom();
    paintTetro();
  }
  // tests
  testFlipY();
}

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
  let test_xyGroup = clone(xyGroup);
  const ySort_before = test_xyGroup.sort((a, b) => a[0] > b[0]);

  let yMin_before = ySort_before[0][0];

  rotateTetro(test_xyGroup);
  const ySort_after = test_xyGroup.sort((a, b) => a[0] > b[0]);

  let yMin_after = ySort_after[0][0];

  if (yMin_before !== yMin_after) {
    console.log("Before: " + yMin_before + " After: " + yMin_after);
    throw new Error("Flipping moves tetro forward.");
  }
}

function rotateTetro(xyGroup) {
  // xyGroup = [
  //   [10, 10],
  //   [11, 10],
  //   [12, 10],
  //   [13, 10],
  // ];
  // sort group by y

  const ySort = xyGroup.sort((a, b) => a[0] > b[0]);
  // group[0][0] min / group[group length - 1][0]max
  const yMin = ySort[0][0];
  const yMax = ySort[ySort.length - 1][0];
  // yMid = Math.ceil((y max - y min) / 2)
  const fromBotToTop = Math.ceil((yMax - yMin) / 2);
  const yMid = yMin + fromBotToTop;
  // halfAbove = filter y < yMid
  const halfAbove = ySort.filter((yx) => yx[0] <= yMid);
  // halfBelow = filter > yMid
  const halfBelow = ySort.filter((yx) => yx[0] > yMid);
  // so now I have two Y halves

  // loop half above
  for (let yx of halfAbove) {
    // xyToMid = yMid - xy[0]
    const xyToMid = yMid - yx[0];
    // xy[0] = xy[0] + (xyToMid * 2)
    yx[0] = yx[0] + xyToMid * 2;
  }
  // loop half below
  for (let yx of halfBelow) {
    // xyToMid = yMid - xy[0]
    const xyToMid = yMid - yx[0];
    // xy[0] = xy[0] + (xyToMid * 2)
    yx[0] = yx[0] + xyToMid * 2;
  }
  xyGroup.color = "blue";
  console.log(xyGroup);
  // now every y, that's xy[0], except mid, is moved to opposite of mid, by distance to mid times two
  // it's always based on max y, min y, mid ceil from that, two halves, reversing y's of these two halves, by using their relative positive/negative distance to mid to alter them
  //

  //whereami
}

function rotateTetroCounterClockwise() {
  if (!xyGroup.rotate) xyGroup.rotate = 1;
  xyGroup.rotate -= 1;
  if (xyGroup.rotate < 1) xyGroup.rotate = 4;
  rotateTetro(xyGroup);
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
