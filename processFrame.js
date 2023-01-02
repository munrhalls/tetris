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
for (let i = 0; i < 150; i++) {
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

    if (e.code === "KeyW") {
      unpaintTetro();
      flipTetroY(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyA") {
      unpaintTetro();
      rotateTetroCounterClockwise(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyD") {
      unpaintTetro();
      rotateTetroClockwise(xyGroup);
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
  let yMin_1 = ySort_before[0][0];
  const ySort_after = test_xyGroup.sort((a, b) => a[0] > b[0]);
  let yMin_2 = ySort_after[0][0];
  if (yMin_1 !== yMin_2) {
    console.log("Before: " + yMin_1 + " After: " + yMin_2);
    throw new Error("Flipping moves tetro forward.");
  }
}
function testRotateY() {
  let test_xyGroup = makeNewTetro();
  const ySort_before = test_xyGroup.sort((a, b) => a[0] > b[0]);
  let yMin_1 = ySort_before[0][0];
  const ySort_after = test_xyGroup.sort((a, b) => a[0] > b[0]);
  let yMin_2 = ySort_after[0][0];
  if (yMin_1 !== yMin_2) {
    console.log("Before: " + yMin_1 + " After: " + yMin_2);
    throw new Error("Flipping moves tetro forward.");
  }

  const xSort_before = test_xyGroup.sort((a, b) => a[1] > b[1]);
  let xMin_1 = xSort_before[1][1];
  const xSort_after = test_xyGroup.sort((a, b) => a[1] > b[1]);
  let xMin_2 = xSort_after[1][1];
  if (xMin_1 !== xMin_2) {
    console.log("Before: " + xMin_1 + " After: " + xMin_2);
    throw new Error("Rotating moves left or right.");
  }
}
function flipTetroY(xyGroup) {
  const sort = xyGroup.sort((a, b) => a[0] > b[0]);
  const min = sort[0][0];
  const max = sort[sort.length - 1][0];
  const height = max - min;
  const mid = min + height / 2;

  let aboveMid = [];
  let belowMid = [];
  for (let yx of xyGroup) {
    if (yx[0] < mid) {
      aboveMid.push(yx);
    }
    if (yx[0] > mid) {
      belowMid.push(yx);
    }
  }

  for (let yx of aboveMid) {
    yx[0] = yx[0] + (mid - yx[0]) * 2;
    console.log(yx[0]);
  }
  for (let yx of belowMid) {
    yx[0] = yx[0] + (mid - yx[0]) * 2;
  }
}

function rotateTetroCounterClockwise(xyGroup) {
  const ySort = xyGroup.sort((a, b) => a[0] > b[0]);
  const yMin = ySort[0][0];
  const yMax = ySort[ySort.length - 1][0];
  const height = yMax - yMin;
  const yMid = yMin + height / 2;

  let belowMid = [];
  let aboveMid = [];
  for (let yx of xyGroup) {
    if (yx[0] < yMid) {
      belowMid.push(yx);
    }
    if (yx[0] > yMid) {
      aboveMid.push(yx);
    }
  }

  const xSort = xyGroup.sort((a, b) => a[1] > b[1]);
  const xMin = xSort[0][1];
  const xMax = xSort[xSort.length - 1][1];
  const width = xMax - xMin;
  const xMid = xMin + width / 2;

  for (let yx of aboveMid) {
    yx[0] = Math.floor(yMid);
    // yx[0] + (mid - yx[0]) * 2;
  }

  let leftOfMid = [];
  let rightOfMid = [];
  // for (let yx of xyGroup) {
  //   if (yx[1] < xMid) {
  //     leftOfMid.push(yx);
  //   }
  //   if (yx[1] > xMid) {
  //     rightOfMid.push(yx);
  //   }
  // }
  // rightOfMid[rightOfMid.length - 1][1] = 0;

  xyGroup.color = "blue";
}

function rotateTetroClockwise(xyGroup) {}
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
