import makeNewTetro from "./makeNewTetro.js";
export const rotator = {
  yo: function () {
    console.log("yo");
  },
};

function moveTetroTop() {
  for (let xy of xyGroup) {
    xy[0] = xy[0] - 1;
  }
}
for (let i = 0; i < 150; i++) {
  testFlipY();
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
function calcVirtualSquare() {
  xyGroup = xyGroup.sort((a, b) => a[0] > b[0]);

  let allx = xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
  let xmin = allx[0];
  let xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
  let xmax = allx[allx.length - 1];

  let ally = xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
  let ymin = ally[0];
  let ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
  let ymax = ally[ally.length - 1];

  let axis_y = Math.abs(ymax) - Math.abs(ymin);
  let axis_x = Math.abs(xmax) - Math.abs(xmin);

  let larger_axis = axis_y >= axis_x ? axis_y : axis_x;
  let larger_axis_1stHalf = Math.floor(larger_axis / 2);
  let larger_axis_2ndHalf = Math.floor(larger_axis / 2);

  const squareTop = Math.ceil(ymid - larger_axis_1stHalf);
  const squareBot = Math.floor(ymid + larger_axis_2ndHalf);
  const squareLeft = Math.ceil(xmid - larger_axis_1stHalf);
  const squareRight = Math.floor(xmid + larger_axis_2ndHalf);

  return {
    top: squareTop,
    bot: squareBot,
    left: squareLeft,
    right: squareRight,
    freeze: false,
  };
}
function handleVirtualSquareChecks(square) {
  let fitSquareInBounds = square;
  if (square.left <= 0) {
    const offset = Math.abs(square.left);
    for (let i = 0; i < offset + 1; i++) {
      moveTetroRight();
    }
    fitSquareInBounds = calcVirtualSquare();
  }
  if (square.right >= columns - 1) {
    const offset = square.right - columns;
    for (let i = 0; i < offset + 2; i++) {
      moveTetroLeft();
    }
    fitSquareInBounds = calcVirtualSquare();
  }
  if (square.bot >= rows) {
    const offset = square.bot - rows;
    for (let i = 0; i < offset + 1; i++) {
      moveTetroTop();
    }
    fitSquareInBounds = calcVirtualSquare();
    fitSquareInBounds.freeze = true;
  }

  return fitSquareInBounds;
}
function getVirtualSquare() {
  const uncheckedSquare = calcVirtualSquare();
  const checkedSquare = handleVirtualSquareChecks(uncheckedSquare);
  return checkedSquare;
}
function handleRotationChecks(uncheckedRotation) {
  if (isCrossingFrozenTetro(uncheckedRotation)) return false;
  return true;
}
function rotateTetroCounterClockwise() {
  const virtualSquare = getVirtualSquare();
  let rotationGroup = xyGroup.map((square) => square.map((coord) => coord));
  rotationGroup.color = xyGroup.color;

  for (let square of rotationGroup) {
    const xRelativeToRightBorder = virtualSquare.right - square[1];
    const yRelativeToTopBorder = square[0] - virtualSquare.top;
    square[0] = virtualSquare.top + xRelativeToRightBorder;
    square[1] = virtualSquare.left + yRelativeToTopBorder;
  }
  const pass = handleRotationChecks(rotationGroup);
  if (pass) xyGroup = rotationGroup;
  if (pass && virtualSquare.freeze === true) freezeTetro();
}
function rotateTetroClockwise() {
  let virtualSquare = getVirtualSquare();
  let rotationGroup = xyGroup.map((square) => square.map((coord) => coord));
  rotationGroup.color = xyGroup.color;

  for (let square of rotationGroup) {
    const xRelativeToRightBorder = virtualSquare.right - square[1];
    const yRelativeToTopBorder = square[0] - virtualSquare.top;
    square[0] = virtualSquare.bot - xRelativeToRightBorder;
    square[1] = virtualSquare.right - yRelativeToTopBorder;
  }
  const pass = handleRotationChecks(rotationGroup);
  if (pass) xyGroup = rotationGroup;
  if (pass && virtualSquare.freeze === true) freezeTetro();
}
