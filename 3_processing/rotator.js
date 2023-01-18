// rotation
// if axis mid even, it's uneven squares num, axis mid = square
// if axis mid uneven, it's even squares num, no axis mid square = below axis mid go to less than it, above axis mid go to more than it

const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { calculator } from "./calculator.js";
import processor from "./processor.js";
import { frozenChecker } from "../3_processing/frozenChecker.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";

export const rotator = {
  quarter: 1,
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
    flippingGroup.lastRotation = xyGroup.lastRotation;
    return flippingGroup;
  },
  rotateTetroCounterClockwise: function rotateTetroCounterClockwise(xyGroup) {
    if (!xyGroup.r) xyGroup.r = 1;

    for (let square of xyGroup) {
      square.color = "transparent";
    }

    let ymax = 0;
    let ymin = rows;
    for (let square of xyGroup) {
      if (square[0] > ymax) ymax = square[0];
      if (square[0] < ymin) ymin = square[0];
    }
    let yLength = ymax - ymin;
    let ymid = ymin + yLength / 2;
    // xyGroup.sort((a, b) => a[0] > b[0]);

    if (!xyGroup?.topSquares) {
      xyGroup.topSquares = [];
      for (let square of xyGroup) {
        if (square[0] < ymid) {
          square.distanceToMid = Math.floor(ymid - square[0]);
          xyGroup.topSquares.push(square);
        }
      }
    }
    if (!xyGroup?.botSquares) {
      xyGroup.botSquares = [];
      for (let square of xyGroup) {
        if (square[0] > ymid) {
          square.distanceToMid = Math.ceil(square[0] - ymid);
          xyGroup.botSquares.push(square);
        }
      }
    }
    console.log(xyGroup.botSquares);
    for (let square of xyGroup.topSquares) {
      square.color = "teal";
    }
    for (let square of xyGroup.botSquares) {
      square.color = "blue";
    }
    // let square = xyGroup[0];
    // square.color = "darkblue";
    // let square2 = xyGroup[1];
    // square2.color = "darkblue";
    // let square3 = xyGroup[2];
    // square3.color = "darkblue";

    if (xyGroup.r === 4) {
      // square[0] = square[0] - 3;
      // square[1] = square[1] - 3;
      // square2[0] = square2[0] - 2;
      // square2[1] = square2[1] - 2;
      // square3[0] = square3[0] - 1;
      // square3[1] = square3[1] - 1;
      for (let square of xyGroup.topSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of xyGroup.botSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
    }
    if (xyGroup.r === 3) {
      // square[0] = square[0] - 3;
      // square[1] = square[1] + 3;
      // square2[0] = square2[0] - 2;
      // square2[1] = square2[1] + 2;
      // square3[0] = square3[0] - 1;
      // square3[1] = square3[1] + 1;
      for (let square of xyGroup.topSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of xyGroup.botSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
    }
    if (xyGroup.r === 2) {
      // square[0] = square[0] + 3;
      // square[1] = square[1] + 3;
      // square2[0] = square2[0] + 2;
      // square2[1] = square2[1] + 2;
      // square3[0] = square3[0] + 1;
      // square3[1] = square3[1] + 1;
      for (let square of xyGroup.topSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of xyGroup.botSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
    }
    if (xyGroup.r === 1) {
      for (let square of xyGroup.topSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of xyGroup.botSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }

      // square[0] = square[0] + 3;
      // square[1] = square[1] - 3;
      // square2[0] = square2[0] + 2;
      // square2[1] = square2[1] - 2;
      // square3[0] = square3[0] + 1;
      // square3[1] = square3[1] - 1;
    }

    if (xyGroup.r >= 4) {
      xyGroup.r = 1;
    } else {
      xyGroup.r = xyGroup.r + 1;
    }
    return xyGroup;
  },
  rotateTetroClockwise: function rotateTetroClockwise(xyGroup) {
    let rails = calculator.getVirtualRails(xyGroup);

    processor.xyGroup.freeze = false;
    let rotationGroup = [
      ...processor.xyGroup.map((square) => [...square.map((coord) => coord)]),
    ];
    rotationGroup.color = processor.xyGroup.color;

    for (let square of rotationGroup) {
      let y = square[0];
      let x = square[1];
      square.color = rotationGroup.color;
      // const distanceXtoLeftBorder = x - rails.left;
      // const distanceYtoTopBorder = y - rails.top;
      const relativeDistanceOfXFromXMid = square[1] - Math.ceil(rails.xmid);
      const relativeDistanceOfYFromYMid = square[0] - Math.ceil(rails.ymid);
      square[0] = Math.ceil(rails.ymid) + relativeDistanceOfXFromXMid;
      square[1] = Math.ceil(rails.xmid) + relativeDistanceOfYFromYMid;

      if (xyGroup.lastRotation === "counterClockwise") {
        square[1] = square[1] + Math.floor(rails.bot - rails.top);
      }
    }

    rotationGroup.lastRotation = "clockwise";
    const pass = calculator.handleRotationChecks(rotationGroup);
    if (!pass) return processor.xyGroup;
    if (pass && rails.freeze === true) rotationGroup.freeze = true;
    return rotationGroup;
  },
};
