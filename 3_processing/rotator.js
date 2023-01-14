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
    for (let yx of flippingGroup) {
      yx.color = flippingGroup.color;
    }
    return flippingGroup;
  },
  rotateTetroCounterClockwise: function rotateTetroCounterClockwise(xyGroup) {
    const virtualSquare = calculator.getVirtualSquare(xyGroup);
    processor.xyGroup.freeze = false;
    let rotationGroup = [
      ...processor.xyGroup.map((square) => [...square.map((coord) => coord)]),
    ];
    rotationGroup.color = processor.xyGroup.color;

    for (let square of rotationGroup) {
      const xRelativeToRightBorder = virtualSquare.right - square[1];
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.top + xRelativeToRightBorder;
      console.log(
        "virtualSquare.top:",
        virtualSquare.top,
        "minus 'yRelativeToTopBorder:'",
        yRelativeToTopBorder
      );
      square[1] = virtualSquare.left + yRelativeToTopBorder;
      console.log(
        "virtualSquare.top:",
        virtualSquare.top,
        "minus 'yRelativeToTopBorder:'",
        yRelativeToTopBorder
      );
      square.color = rotationGroup.color;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (!pass) return processor.xyGroup;
    if (pass && virtualSquare.freeze === true) rotationGroup.freeze = true;
    return rotationGroup;
  },
  rotateTetroClockwise: function rotateTetroClockwise(xyGroup) {
    let virtualSquare = calculator.getVirtualSquare(xyGroup);
    processor.xyGroup.freeze = false;
    let rotationGroup = [
      ...processor.xyGroup.map((square) => [...square.map((coord) => coord)]),
    ];
    rotationGroup.color = processor.xyGroup.color;
    for (let square of rotationGroup) {
      const xRelativeToLeftBorder = square[1] - virtualSquare.left;
      const yRelativeToTopBorder = square[0] - virtualSquare.top;
      square[0] = virtualSquare.top + xRelativeToLeftBorder;
      square[1] = virtualSquare.right - yRelativeToTopBorder;
      console.log(
        "virtualSquare.right:",
        virtualSquare.right,
        "minus 'yRelativeToTopBorder:'",
        yRelativeToTopBorder
      );
      square.color = rotationGroup.color;
    }
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (!pass) return processor.xyGroup;
    if (pass && virtualSquare.freeze === true) rotationGroup.freeze = true;
    return rotationGroup;
  },
};

// rotating back and forth, not causing the square to move
// max - min -> both axis -> store larger one
// sort -> max - min, divide by 2, + min = mid
// do for y and x
// now, y mid + half larger axis, - half larger axis
// same for x, x mid + half larger axis, x mid - half larger axis
// got virtual square

// rotate left, get the virtual square right, left, top
// loop all squares
// x distance to right border = virt square right - x
// y distance to top border = y - virt square top
// now, y = virtual square left + x distance to right border
// now, x = virtual square top + y distance to top border

// problem
// x mid can be even or uneven
// y mid can be even or uneven
// same with half larger axis

//trace:

// rotation counter clockwise passses through
// start, press a -> get max min's, get larger axis, get mids, get virtual square
// let's say it's 13 - 8 x -> 5 -> 7.5 x mid
// 12 - 9 y -> 3 -> 10.5 y mid
// larger axis, it's x and it's 5, half of larger axis is 2.5
// virtual square is:
// top is y mid 10.5 - 2.5, that's 8
// bot is y mid 10.5 + 2.5 that's 13
// left is x mid 7.5 - 2.5 that's 5
// right is x mid 7.5 + 2.5 that's 10

// [10, 9], [10, 10], [11, 10], [12, 10], [12, 11]

// now, looping all squares
// x distance to right border = virt right (10) - x 9  = 1
// y distance to top border = y (9) - virt square top (8) = 1
// y = virt left (5) + x distance to right border (2) = 7
// x = virt top (8) + 1 = 9

// now, cases:
// rotate same direction (counter clockwise)
//
// rotation clockwise passes through
