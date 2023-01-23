// rotation
// if axis mid even, it's uneven squares num, axis mid = square
// if axis mid uneven, it's even squares num, no axis mid square = below axis mid go to less than it, above axis mid go to more than it

const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { calculator } from "./calculator.js";
import processor from "./processor.js";
import { frozenChecker } from "../3_processing/frozenChecker.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";
import { mover } from "./mover.js";

export const rotator = {
  setOriginalReference: function setOriginalReference(xyGroup) {
    xyGroup.rotationReference = true;

    let ymax = 0;
    let ymin = rows;
    let xmax = 0;
    let xmin = columns;
    for (let square of xyGroup) {
      if (square[0] > ymax) ymax = square[0];
      if (square[0] < ymin) ymin = square[0];
      if (square[1] > xmax) xmax = square[1];
      if (square[1] < xmin) xmin = square[1];
    }
    const yLength = ymax - ymin;
    const ymid = ymin + yLength / 2;
    const xLength = xmax - xmin;
    const xmid = xmin + xLength / 2;

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
    if (!xyGroup.leftSquares) {
      xyGroup.leftSquares = [];
      for (let square of xyGroup) {
        if (square[1] < xmid) {
          square.distanceXToMid = Math.floor(xmid - square[1]);
          xyGroup.leftSquares.push(square);
        }
      }
    }
    if (!xyGroup.rightSquares) {
      xyGroup.rightSquares = [];
      for (let square of xyGroup) {
        if (square[1] > xmid) {
          square.distanceXToMid = Math.ceil(square[1] - xmid);
          xyGroup.rightSquares.push(square);
        }
      }
    }
  },
  handleRotationChecks: function handleRotationChecks(uncheckedRotation) {
    if (frozenChecker.isCrossingFrozenTetro(uncheckedRotation)) return false;
    return true;
  },
  handleOffsets: function handleOffsets(xyGroup) {
    let xmin = columns;
    let xmax = 0;
    for (let square of xyGroup) {
      if (square[1] < xmin) xmin = square[1];
      if (square[1] > xmax) xmax = square[1];
    }
    if (xmin < 1) {
      const offsetLeft = Math.abs(1 - xmin);
      xyGroup = mover.offsetTetroLeft(xyGroup, offsetLeft);
    }
    if (xmax > columns - 1) {
      const offsetRight = xmax - (columns - 1);
      xyGroup = mover.offsetTetroRight(xyGroup, offsetRight);
    }
  },
  moveLeft: function (square) {
    square[1] = square[1] - 1;
    return square;
  },
  moveBottom: function moveBottom(square) {
    square[0] = square[0] + 1;
  },
  rotateTetroCounterClockwise: function rotateTetroCounterClockwise(xyGroup) {
    let rotationGroup = structuredClone(xyGroup);

    if (!rotationGroup.rotationReference)
      this.setOriginalReference(rotationGroup);
    if (!rotationGroup.quadrant) {
      rotationGroup.quadrant = 4;
    } else if (rotationGroup.quadrant - 1 < 1) {
      rotationGroup.quadrant = 4;
    } else {
      rotationGroup.quadrant = rotationGroup.quadrant - 1;
    }

    let ymax = 0;
    let ymin = rows;
    let xmax = 0;
    let xmin = columns;
    for (let square of xyGroup) {
      if (square[0] > ymax) ymax = square[0];
      if (square[0] < ymin) ymin = square[0];
      if (square[1] > xmax) xmax = square[1];
      if (square[1] < xmin) xmin = square[1];
    }
    const yLength = ymax - ymin;
    const ymid = ymin + yLength / 2;
    const xLength = xmax - xmin;
    const xmid = xmin + xLength / 2;

    console.log(rotationGroup);

    rotationGroup[0].color = "blue";
    rotationGroup[1].color = "green";
    rotationGroup[2].color = "red";
    rotationGroup[3].color = "orange";

    rotationGroup.topRight = rotationGroup.find(
      (xy) => xy[0] === ymin && xy[1] === xmax
    );

    rotationGroup.bottomRight = rotationGroup.find(
      (xy) => xy[0] === ymax && xy[1] === xmax
    );

    rotationGroup.bottomLeft = rotationGroup.find(
      (xy) => xy[0] === ymax && xy[1] === xmin
    );

    rotationGroup.topLeft = rotationGroup.find(
      (xy) => xy[0] === ymin && xy[1] === xmin
    );

    if (rotationGroup.quadrant === 4) {
      let square = rotationGroup.topRight;
      this.moveLeft(square);
      let square2 = rotationGroup.bottomRight;
      square2[0] = square2[0] - 1;
      square2[1] = square2[1];
      let square3 = rotationGroup.bottomLeft;
      square3[0] = square3[0];
      square3[1] = square3[1] + 1;
      let square4 = rotationGroup.topLeft;
      square4[0] = square[0] + 1;
      square4[1] = square4[1];
    }
    if (rotationGroup.quadrant === 3) {
      let square = rotationGroup.topLeft;
      square[0] = square[0] + 1;
      square[1] = square[1];
      let square2 = rotationGroup.topRight;
      square2[0] = square2[0];
      square2[1] = square2[1] - 1;
      let square3 = rotationGroup.bottomRight;
      square3[0] = square3[0] - 1;
      square3[1] = square3[1];
      let square4 = rotationGroup.topLeft;
      square4[0] = square[0];
      square4[1] = square4[1] + 1;
    }
    if (rotationGroup.quadrant === 2) {
      let square = rotationGroup.find((xy) => xy[0] === 13 && xy[1] === 7);
      square[0] = square[0];
      square[1] = square[1] + 1;
      let square2 = rotationGroup.find((xy) => xy[0] === 12 && xy[1] === 7);
      square2[0] = square2[0] + 1;
      square2[1] = square2[1];
      let square3 = rotationGroup.find((xy) => xy[0] === 12 && xy[1] === 8);
      square3[0] = square3[0];
      square3[1] = square3[1] - 1;
      let square4 = rotationGroup.topLeft;
      square4[0] = square[0] - 1;
      square4[1] = square4[1];
    }
    if (rotationGroup.quadrant === 1) {
      let square = rotationGroup.find((xy) => xy[0] === 13 && xy[1] === 8);
      square[0] = square[0] - 1;
      square[1] = square[1];
      let square2 = rotationGroup.find((xy) => xy[0] === 13 && xy[1] === 7);
      square2[0] = square2[0];
      square2[1] = square2[1] + 1;
      let square3 = rotationGroup.find((xy) => xy[0] === 12 && xy[1] === 7);
      square3[0] = square3[0] + 1;
      square3[1] = square3[1];
      let square4 = rotationGroup.topLeft;
      square4[0] = square[0];
      square4[1] = square4[1] - 1;
    }
    // if (rotationGroup.quadrant === 1) {
    //   for (let square of rotationGroup.topSquares) {
    //     square[0] = square[0] - square.distanceToMid;
    //     square[1] = square[1] - square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.botSquares) {
    //     square[0] = square[0] + square.distanceToMid;
    //     square[1] = square[1] + square.distanceToMid;
    //   }

    //   for (let square of rotationGroup.leftSquares) {
    //     square[0] = square[0] - square.distanceXToMid;
    //     square[1] = square[1] - square.distanceXToMid;
    //   }
    //   for (let square of rotationGroup.rightSquares) {
    //     square[0] = square[0] + square.distanceXToMid;
    //     square[1] = square[1] + square.distanceXToMid;
    //   }
    // }
    // if (rotationGroup.quadrant === 2) {
    //   for (let square of rotationGroup.topSquares) {
    //     square[0] = square[0] - square.distanceToMid;
    //     square[1] = square[1] + square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.botSquares) {
    //     square[0] = square[0] + square.distanceToMid;
    //     square[1] = square[1] - square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.leftSquares) {
    //     square[0] = square[0] + square.distanceXToMid;
    //     square[1] = square[1] + square.distanceXToMid;
    //   }
    //   for (let square of rotationGroup.rightSquares) {
    //     square[0] = square[0] - square.distanceXToMid;
    //     square[1] = square[1] - square.distanceXToMid;
    //   }
    // }
    // if (rotationGroup.quadrant === 3) {
    //   for (let square of rotationGroup.topSquares) {
    //     square[0] = square[0] + square.distanceToMid;
    //     square[1] = square[1] + square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.botSquares) {
    //     square[0] = square[0] - square.distanceToMid;
    //     square[1] = square[1] - square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.leftSquares) {
    //     square[0] = square[0] - square.distanceXToMid;
    //     square[1] = square[1] - square.distanceXToMid;
    //   }
    //   for (let square of rotationGroup.rightSquares) {
    //     square[0] = square[0] + square.distanceXToMid;
    //     square[1] = square[1] + square.distanceXToMid;
    //   }
    // }
    // if (rotationGroup.quadrant === 4) {
    //   for (let square of rotationGroup.topSquares) {
    //     square[0] = square[0] + square.distanceToMid;
    //     square[1] = square[1] - square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.botSquares) {
    //     square[0] = square[0] - square.distanceToMid;
    //     square[1] = square[1] + square.distanceToMid;
    //   }
    //   for (let square of rotationGroup.leftSquares) {
    //     square[0] = square[0] + square.distanceXToMid;
    //     square[1] = square[1] + square.distanceXToMid;
    //   }
    //   for (let square of rotationGroup.rightSquares) {
    //     square[0] = square[0] - square.distanceXToMid;
    //     square[1] = square[1] - square.distanceXToMid;
    //   }
    // }

    this.handleOffsets(rotationGroup);
    const pass = !frozenChecker.isCrossingFrozenTetro(rotationGroup);
    if (!pass) return xyGroup;
    return rotationGroup;
  },
  rotateTetroClockwise: function rotateTetroClockwise(xyGroup) {
    let rotationGroup = structuredClone(xyGroup);

    if (!rotationGroup.rotationReference)
      this.setOriginalReference(rotationGroup);

    if (!rotationGroup.quadrant) {
      rotationGroup.quadrant = 2;
    } else if (rotationGroup.quadrant + 1 > 4) {
      rotationGroup.quadrant = 1;
    } else {
      rotationGroup.quadrant = rotationGroup.quadrant + 1;
    }

    console.log(rotationGroup.quadrant);
    if (rotationGroup.quadrant === 1) {
      for (let square of rotationGroup.topSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of rotationGroup.botSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of rotationGroup.leftSquares) {
        square[0] = square[0] - square.distanceXToMid;
        square[1] = square[1] - square.distanceXToMid;
      }
      for (let square of rotationGroup.rightSquares) {
        square[0] = square[0] + square.distanceXToMid;
        square[1] = square[1] + square.distanceXToMid;
      }
    }
    if (rotationGroup.quadrant === 2) {
      for (let square of rotationGroup.topSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of rotationGroup.botSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of rotationGroup.leftSquares) {
        square[0] = square[0] + square.distanceXToMid;
        square[1] = square[1] + square.distanceXToMid;
      }
      for (let square of rotationGroup.rightSquares) {
        square[0] = square[0] - square.distanceXToMid;
        square[1] = square[1] - square.distanceXToMid;
      }
    }
    if (rotationGroup.quadrant === 3) {
      for (let square of rotationGroup.topSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of rotationGroup.botSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of rotationGroup.leftSquares) {
        square[0] = square[0] - square.distanceXToMid;
        square[1] = square[1] - square.distanceXToMid;
      }
      for (let square of rotationGroup.rightSquares) {
        square[0] = square[0] + square.distanceXToMid;
        square[1] = square[1] + square.distanceXToMid;
      }
    }
    if (rotationGroup.quadrant === 4) {
      for (let square of rotationGroup.topSquares) {
        square[0] = square[0] - square.distanceToMid;
        square[1] = square[1] - square.distanceToMid;
      }
      for (let square of rotationGroup.botSquares) {
        square[0] = square[0] + square.distanceToMid;
        square[1] = square[1] + square.distanceToMid;
      }
      for (let square of rotationGroup.leftSquares) {
        square[0] = square[0] + square.distanceXToMid;
        square[1] = square[1] + square.distanceXToMid;
      }
      for (let square of rotationGroup.rightSquares) {
        square[0] = square[0] - square.distanceXToMid;
        square[1] = square[1] - square.distanceXToMid;
      }
    }

    this.handleOffsets(rotationGroup);
    const pass = !frozenChecker.isCrossingFrozenTetro(rotationGroup);
    if (!pass) return xyGroup;
    return rotationGroup;
  },
};
