const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { mover } from "./mover.js";
import { frozenChecker } from "./frozenChecker.js";

export const calculator = {
  xyGroup: null,
  getVirtualRails: function getVirtualRails(xyGroup) {
    this.xyGroup = xyGroup;
    const uncheckedrail = this.calcVirtualRails();
    const checkedrail = this.handleVirtualRailChecks(uncheckedrail);
    return checkedrail;
  },
  calcVirtualRails: function calcVirtualRails() {
    const allx = this.xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
    const xmin = allx[0];
    const xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
    const xmax = allx[allx.length - 1];

    const ally = this.xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
    const ymin = ally[0];
    const ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
    const ymax = ally[ally.length - 1];

    const axis_y = Math.abs(ymax) - Math.abs(ymin);
    const axis_x = Math.abs(xmax) - Math.abs(xmin);

    const railTop = ymid - axis_x / 2;
    const railBot = ymid + axis_x / 2;
    const railLeft = xmid - axis_y / 2;
    const railRight = xmid + axis_y / 2;

    return {
      top: railTop,
      bot: railBot,
      left: railLeft,
      right: railRight,
      ymid: ymid,
      xmid: xmid,
      freeze: false,
    };
  },
  handleVirtualRailChecks: function handleVirtualRailChecks(rail) {
    let fitrailInBounds = rail;
    if (rail.left <= 0) {
      const offset = Math.abs(rail.left);
      for (let i = 0; i < offset + 1; i++) {
        this.xyGroup = mover.moveTetroRight(this.xyGroup);
      }
      fitrailInBounds = this.calcVirtualRails();
    }
    if (rail.right >= columns - 1) {
      const offset = rail.right - columns;
      for (let i = 0; i < offset + 2; i++) {
        this.xyGroup = mover.moveTetroLeft(this.xyGroup);
      }
      fitrailInBounds = this.calcVirtualRails();
    }
    if (rail.bot >= rows) {
      const offset = rail.bot - rows;
      for (let i = 0; i < offset + 1; i++) {
        moveTetroTop();
      }
      fitrailInBounds = this.calcVirtualRails();
      fitrailInBounds.freeze = true;
    }

    return fitrailInBounds;
  },
  handleRotationChecks: function handleRotationChecks(uncheckedRotation) {
    if (frozenChecker.isCrossingFrozenTetro(uncheckedRotation)) return false;
    return true;
  },
};
