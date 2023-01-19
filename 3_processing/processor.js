import { mover } from "./mover.js";
import checker from "./checker.js";
import { frozenChecker } from "./frozenChecker.js";
import { painter } from "../4_displaying/painter.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";
import makeNewTetro from "../1_building/makeNewTetro.js";

let xyGroup = null;

const processor = {
  xyGroup: null,
  processCoordSys: function processCoordSys() {
    if (!this.xyGroup) {
      // this.xyGroup = makeNewTetro();
      this.xyGroup = [
        [12, 9],
        [13, 9],
        [13, 8],
        [13, 7],
        [13, 6],
        [13, 5],
        [13, 10],
        [13, 11],
        [14, 10],
        [14, 11],
        [14, 12],
        [14, 9],
        [14, 9],
        [15, 10],
        [16, 10],
      ];
      this.xyGroup.color = "purple";
      let count = 0;
      for (let square of this.xyGroup) {
        square.color = "purple";
        square.id = count;
        count++;
      }
    } else {
      if (checker.isAtBoundBottom(this.xyGroup)) {
        tetroFreezer.freezeTetro(this.xyGroup);
        return (this.xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(this.xyGroup)) {
        tetroFreezer.freezeTetro(this.xyGroup);
        return (this.xyGroup = null);
      }

      painter.unpaintTetro(this.xyGroup);
      this.xyGroup = mover.moveTetroBottom(this.xyGroup);
      painter.paintTetro(this.xyGroup);
    }
  },
};

export default processor;
