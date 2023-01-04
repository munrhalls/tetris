import makeNewTetro from "./makeNewTetro.js";
let xyGroup = null;

let frozenTetroes = [];
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
  if (isGameOver()) return localStorage.setItem("isGameOver", "true");

  if (!xyGroup) {
    xyGroup = makeNewTetro();
    // TEMPORARILY, TESTING ROTATION
    // xyGroup = [
    //   [12, 10],
    //   [12, 11],
    //   [12, 12],
    // ];
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
    throw new Error("Flipping moves tetro forward.");
  }

  const xSort_before = test_xyGroup.sort((a, b) => a[1] > b[1]);
  let xMin_1 = xSort_before[1][1];
  const xSort_after = test_xyGroup.sort((a, b) => a[1] > b[1]);
  let xMin_2 = xSort_after[1][1];
  if (xMin_1 !== xMin_2) {
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
  }
  for (let yx of belowMid) {
    yx[0] = yx[0] + (mid - yx[0]) * 2;
  }
}

function rotateTetroCounterClockwise(xyGroup) {
  xyGroup = xyGroup.sort((a, b) => a[0] > b[0]);

  const allx = xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
  const xmin = allx[0];
  const xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
  const xmax = allx[allx.length - 1];

  const ally = xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
  const ymin = ally[0];
  const ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
  const ymax = ally[ally.length - 1];

  const axis_y = Math.abs(ymax) - Math.abs(ymin);
  const axis_x = Math.abs(xmax) - Math.abs(xmin);

  const larger_axis = axis_y >= axis_x ? axis_y : axis_x;
  const larger_axis_1stHalf = Math.floor(larger_axis / 2);
  const larger_axis_2ndHalf = Math.floor(larger_axis / 2);

  const squareTop = Math.ceil(ymid - larger_axis_1stHalf);
  const squareLeft = Math.ceil(xmid - larger_axis_1stHalf);
  const squareRight = Math.floor(xmid + larger_axis_2ndHalf);

  for (let square of xyGroup) {
    const xRelativeToRightBorder = squareRight - square[1];
    const yRelativeToTopBorder = square[0] - squareTop;

    square[0] = squareTop + xRelativeToRightBorder;
    square[1] = squareLeft + yRelativeToTopBorder;
  }

  xyGroup.color = "blue";
}

function rotateTetroClockwise(xyGroup) {
  xyGroup = xyGroup.sort((a, b) => a[0] > b[0]);

  const allx = xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
  const xmin = allx[0];
  const xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
  const xmax = allx[allx.length - 1];

  const ally = xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
  const ymin = ally[0];
  const ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
  const ymax = ally[ally.length - 1];

  const axis_y = Math.abs(ymax) - Math.abs(ymin);
  const axis_x = Math.abs(xmax) - Math.abs(xmin);
  const larger_axis = axis_y >= axis_x ? axis_y : axis_x;
  const larger_axis_1stHalf = Math.floor(larger_axis / 2);
  const larger_axis_2ndHalf = Math.floor(larger_axis / 2);

  const squareTop = Math.ceil(ymid - larger_axis_1stHalf);
  const squareBot = Math.floor(ymid + larger_axis_2ndHalf);
  const squareRight = Math.floor(xmid + larger_axis_2ndHalf);

  for (let square of xyGroup) {
    const xRelativeToRightBorder = squareRight - square[1];
    const yRelativeToTopBorder = square[0] - squareTop;
    square[0] = squareBot - xRelativeToRightBorder;
    square[1] = squareRight - yRelativeToTopBorder;
  }

  xyGroup.color = "blue";
}
function unpaintTetro() {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  if (xy[0] < 0) return;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.innerText = ``;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = `0px`;

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
  document.getElementById(
    `cellXY-${xy[0]}-${xy[1]}`
  ).innerText = `Y:${xy[0]} X:${xy[1]}`;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = "7px";
}
