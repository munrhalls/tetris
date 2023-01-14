const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { mover } from "./mover.js";
import { frozenChecker } from "./frozenChecker.js";

export const calculator = {
  xyGroup: null,
  getVirtualSquare: function getVirtualSquare(xyGroup) {
    this.xyGroup = xyGroup;
    const uncheckedSquare = this.calcVirtualSquare();
    const checkedSquare = this.handleVirtualSquareChecks(uncheckedSquare);
    return checkedSquare;
  },
  calcVirtualSquare: function calcVirtualSquare() {
    let allx = this.xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
    let xmin = allx[0];
    let xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
    let xmax = allx[allx.length - 1];
    console.log("xmid ", xmid);

    let ally = this.xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
    let ymin = ally[0];
    let ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
    console.log("ymid ", ymid);
    let ymax = ally[ally.length - 1];
    let axis_y = Math.abs(ymax) - Math.abs(ymin);
    let axis_x = Math.abs(xmax) - Math.abs(xmin);

    let larger_axis = axis_y >= axis_x ? axis_y : axis_x;
    let larger_axis_1stHalf = larger_axis / 2;
    let larger_axis_2ndHalf = larger_axis / 2;
    console.log(larger_axis_1stHalf, "first half");

    let squareTop = ymid - larger_axis_1stHalf;
    let squareBot = ymid + larger_axis_2ndHalf;
    let squareLeft = xmid - larger_axis_1stHalf;
    let squareRight = xmid + larger_axis_2ndHalf;

    return {
      top: squareTop,
      bot: squareBot,
      left: squareLeft,
      right: squareRight,
      freeze: false,
    };
  },
  handleVirtualSquareChecks: function handleVirtualSquareChecks(square) {
    let fitSquareInBounds = square;
    if (square.left <= 0) {
      const offset = Math.abs(square.left);
      for (let i = 0; i < offset + 1; i++) {
        this.xyGroup = mover.moveTetroRight(this.xyGroup);
      }
      fitSquareInBounds = this.calcVirtualSquare();
    }
    if (square.right >= columns - 1) {
      const offset = square.right - columns;
      for (let i = 0; i < offset + 2; i++) {
        this.xyGroup = mover.moveTetroLeft(this.xyGroup);
      }
      fitSquareInBounds = this.calcVirtualSquare();
    }
    if (square.bot >= rows) {
      const offset = square.bot - rows;
      for (let i = 0; i < offset + 1; i++) {
        moveTetroTop();
      }
      fitSquareInBounds = this.calcVirtualSquare();
      fitSquareInBounds.freeze = true;
    }

    return fitSquareInBounds;
  },
  handleRotationChecks: function handleRotationChecks(uncheckedRotation) {
    if (frozenChecker.isCrossingFrozenTetro(uncheckedRotation)) return false;
    return true;
  },
};
