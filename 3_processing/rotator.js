const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { calculator } from "./calculator.js";
import processor from "./processor.js";
import { frozenChecker } from "../3_processing/frozenChecker.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";

export const rotator = {
  flipTetro: function flipTetro(xyGroup) {
    let flippingGroup = processor.xyGroup.map((square) =>
      square.map((coord) => coord)
    );
    flippingGroup.color = processor.xyGroup.color;

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

    if (frozenChecker.isCrossingFrozenTetro(flippingGroup))
      return processor.xyGroup;
    return flippingGroup;
  },
  rotateTetroCounterClockwise: function rotateTetroCounterClockwise(xyGroup) {
    const virtualSquare = calculator.getVirtualSquare(xyGroup);
    processor.xyGroup.freeze = false;
    let rotationGroup = processor.xyGroup.map((square) =>
      square.map((coord) => coord)
    );
    rotationGroup.color = processor.xyGroup.color;

    for (let square of rotationGroup) {
      const xRelativeToRightBorder = virtualSquare.right - square[1];
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.top + xRelativeToRightBorder;
      square[1] = virtualSquare.left + yRelativeToTopBorder;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (pass) processor.xyGroup = rotationGroup;
    if (pass && virtualSquare.freeze === true) processor.xyGroup.freeze = true;
    return processor.xyGroup;
  },
  rotateTetroClockwise: function rotateTetroClockwise(xyGroup) {
    let virtualSquare = calculator.getVirtualSquare(xyGroup);
    processor.xyGroup.freeze = false;
    let rotationGroup = [
      ...processor.xyGroup.map((square) => [...square.map((coord) => coord)]),
    ];

    // rotationGroup.color = processor.xyGroup.color;

    for (let square of rotationGroup) {
      const xRelativeToRightBorder = virtualSquare.right - square[1];
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.bot - xRelativeToRightBorder;
      square[1] = virtualSquare.right - yRelativeToTopBorder;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);

    if (pass) {
      let color = processor.xyGroup.color;
      processor.xyGroup = rotationGroup;
      processor.xyGroup.color = color;
      for (let xy of processor.xyGroup) {
        xy.color = color;
      }
    }

    if (pass && virtualSquare.freeze === true) processor.xyGroup.freeze = true;

    return processor.xyGroup;
  },
};
