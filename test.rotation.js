export default function test_rotation() {
  const test_xyGroup = makeNewTetro();

  for (let i = 0; i < 50; i++) {}
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

function calcVirtualSquare(xyGroup) {
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
  if (square.right >= columns) {
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

function rotateTetroCounterClockwise() {
  let virtualSquare = getVirtualSquare();

  for (let square of xyGroup) {
    const xRelativeToRightBorder = virtualSquare.right - square[1];
    const yRelativeToTopBorder = square[0] - virtualSquare.top;
    square[0] = virtualSquare.top + xRelativeToRightBorder;
    square[1] = virtualSquare.left + yRelativeToTopBorder;
  }
  if (virtualSquare.freeze === true) freezeTetro();
}

const tetris = document.getElementById("tetris");
const columns = parseInt(tetris.getAttribute("columns"));
const colors = [
  "blue",
  "purple",
  "black",
  "yellow",
  "green",
  "darkgrey",
  "teal",
  "darkblue",
  "red",
  "darkred",
  "orange",
];

function makeNewTetro() {
  let xyGroup = [[0, Math.floor(columns / 2)]];
  xyGroup.color = colors[getRandomInt(0, colors.length)];

  rndLineAtRndDir(xyGroup);
  rndLineAtRndDir(xyGroup);
  rndLineAtRndDir(xyGroup);
  rndLineAtRndDir(xyGroup);

  return xyGroup;
}

function rndLineAtRndDir(xyGroup) {
  let rndAxis = ["vertical", "horizontal"][getRandomInt(0, 2)];
  let rndNum = getRandomInt(1, 4);

  for (let i = 0; i < rndNum; i++) {
    let lastSquare = [...xyGroup[xyGroup.length - 1]];
    let thickness = [0, 1, 2, 3, 4][getRandomInt(0, 5)];
    let thickSquare;

    if (lastSquare?.length !== 2)
      throw new Error("Generating new tetro, improper variable set.");

    if (rndAxis === "vertical") {
      lastSquare[0] += -1;
      for (let j = 0; j < thickness; j++) {
        thickSquare = [...[...xyGroup[xyGroup.length - 1]]];
        thickSquare[1] += -1;
        xyGroup.push(thickSquare);
      }
      xyGroup.push(lastSquare);
    }
    if (rndAxis === "horizontal") {
      lastSquare[1] += -1;
      xyGroup.push(lastSquare);
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function up(xy) {
  return [xy[0] + -1, xy[1]];
}
