const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { calculator } from "./calculator.js";
import { tetroFreezer } from "../freezing/tetroFreezer.js";
import { frozenChecker } from "../freezing/frozenChecker.js";

export const rotator = {
  xyGroup: null,

  flipTetro: function flipTetro(xyGroup) {
    this.xyGroup = xyGroup;
    let flippingGroup = this.xyGroup.map((square) =>
      square.map((coord) => coord)
    );
    flippingGroup.color = this.xyGroup.color;

    const sort = flippingGroup.sort((a, b) => a[0] > b[0]);
    const min = sort[0][0];
    const max = sort[sort.length - 1][0];
    const height = max - min;
    const mid = min + height / 2;

    let aboveMid = [];
    let belowMid = [];
    for (let yx of flippingGroup) {
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

    if (frozenChecker.isCrossingFrozenTetro(flippingGroup)) return this.xyGroup;
    return flippingGroup;
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
