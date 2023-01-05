const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { calculator } from "./calculator.js";
import makeNewTetro from "./makeNewTetro.js";

export const rotator = {
  xyGroup: null,

  flipTetroY: function flipTetroY(xyGroup) {
    this.xyGroup = xyGroup;
    const sort = this.xyGroup.sort((a, b) => a[0] > b[0]);
    const min = sort[0][0];
    const max = sort[sort.length - 1][0];
    const height = max - min;
    const mid = min + height / 2;

    let aboveMid = [];
    let belowMid = [];
    for (let yx of this.xyGroup) {
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

    return this.xyGroup;
  },

  rotateTetroCounterClockwise: function rotateTetroCounterClockwise(xyGroup) {
    this.xyGroup = xyGroup;
    const virtualSquare = calculator.getVirtualSquare(xyGroup);
    this.xyGroup.freeze = false;
    let rotationGroup = this.xyGroup.map((square) =>
      square.map((coord) => coord)
    );
    rotationGroup.color = this.xyGroup.color;

    for (let square of rotationGroup) {
      const xRelativeToRightBorder = virtualSquare.right - square[1];
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.top + xRelativeToRightBorder;
      square[1] = virtualSquare.left + yRelativeToTopBorder;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (pass) this.xyGroup = rotationGroup;
    if (pass && virtualSquare.freeze === true) this.xyGroup.freeze = true;
    return this.xyGroup;
  },
  rotateTetroClockwise: function rotateTetroClockwise(xyGroup) {
    this.xyGroup = xyGroup;
    let virtualSquare = calculator.getVirtualSquare(xyGroup);
    this.xyGroup.freeze = false;
    let rotationGroup = this.xyGroup.map((square) =>
      square.map((coord) => coord)
    );
    rotationGroup.color = this.xyGroup.color;

    for (let square of rotationGroup) {
      const xRelativeToRightBorder = virtualSquare.right - square[1];
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.bot - xRelativeToRightBorder;
      square[1] = virtualSquare.right - yRelativeToTopBorder;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (pass) this.xyGroup = rotationGroup;
    if (pass && virtualSquare.freeze === true) this.xyGroup.freeze = true;
    return this.xyGroup;
  },
};

// for (let i = 0; i < 150; i++) {
//   testFlipY();
// }
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
