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

const testSuite_flipTetroY_size = 25;
for (let i = 0; i <= testSuite_flipTetroY_size; i++) {
  testFlipY();
}

function testFlipY() {
  // let test_xyGroup = makeNewTetro();
  let test_xyGroup = [
    [-8, 10],
    [-7, 11],
    [-7, 10],
    [-7, 9],
    [-6, 11],
    [-6, 10],
    [-6, 9],
    [-6, 8],
    [-6, 7],
    [-5, 11],
    [-5, 10],
    [-5, 9],
    [-5, 8],
    [-5, 7],
    [-4, 11],
    [-4, 10],
    [-4, 9],
    [-4, 8],
    [-4, 7],
    [-3, 11],
    [-2, 11],
    [-2, 10],
    [-2, 9],
    [-2, 8],
    [-2, 7],
  ];
  console.log((-2 - -8) / 2, "calc");
  console.log(-8 + 3, "calc 2, MID");

  console.log(test_xyGroup, "T E S T group");
  const ySort_before = test_xyGroup.sort((a, b) => a[0] > b[0]);

  let yMin_before = ySort_before[0][0];

  flipTetroY(test_xyGroup);
  const ySort_after = test_xyGroup.sort((a, b) => a[0] > b[0]);

  let yMin_after = ySort_after[0][0];

  if (yMin_before !== yMin_after) {
    console.log("Before: " + yMin_before + " After: " + yMin_after);
    throw new Error("Flipping moves tetro forward.");
  }
}

function flipTetroY(xyGroup) {
  const isZeroHeight = xyGroup.every((val) => val[0] === xyGroup[0][0]);
  if (isZeroHeight) return;
  // sort group by y
  const ySort = xyGroup.sort((a, b) => a[0] > b[0]);
  // yx[0] is most -, biggest in the minus direction, sort should work
  // group[0][0] min / group[group length - 1][0]max
  const yMin = ySort[0][0]; // biggest minus
  const yMax = ySort[ySort.length - 1][0]; // smallest minus
  // yMid = Math.ceil((y max - y min) / 2)
  const halfOfBetweenTopAndBot = (yMax - yMin) / 2;
  const yMid = yMin + halfOfBetweenTopAndBot;
  console.log(yMid, "MID actial");
  // halfBelowMid = filter y < yMid
  const halfBelowMid = ySort.filter((yx) => {
    yx[0] < yMid;
    console.log(yx[0] <= yMid, "halfBelowMid filter condish");
  });
  console.log(halfBelowMid, "half above");
  // halfBelow = filter > yMid
  const halfAboveMid = ySort.filter((yx) => yx[0] > yMid);
  // so now I have two Y halves

  // loop half above
  for (let yx of halfBelowMid) {
    // xyToMid = yMid - xy[0]
    const xyToMid = yMid - yx[0];
    // xy[0] = xy[0] + (xyToMid * 2)
    const hopOverBy1 = yMid % 2 === 0 ? 1 : 0;
    yx[0] = yx[0] + xyToMid * 2 + hopOverBy1;
  }
  // loop half below
  for (let yx of halfAboveMid) {
    // xyToMid = yMid - xy[0]
    const xyToMid = yMid - yx[0];
    // xy[0] = xy[0] + (xyToMid * 2)
    const hopOverBy1 = yMid % 2 === 0 ? 1 : 0;
    yx[0] = yx[0] + xyToMid * 2 - hopOverBy1;
    console.log(yx[0]);
  }
  xyGroup.color = "blue";
  console.log(xyGroup, "inside flipTetroY, end of function");
  // now every y, that's xy[0], except mid, is moved to opposite of mid, by distance to mid times two
  // it's always based on max y, min y, mid ceil from that, two halves, reversing y's of these two halves, by using their relative positive/negative distance to mid to alter them
  //

  //whereami
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
