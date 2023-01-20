import { mover } from "./mover.js";
import checker from "./checker.js";
import { frozenChecker } from "./frozenChecker.js";
import scorer from "./scorer.js";
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
        [12, 10],
        [12, 11],
        [12, 12],
        [12, 13],
        [12, 14],
        [12, 15],
        [12, 16],
        [12, 17],
        [12, 18],
        [12, 19],
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
        scorer.processLineClears(this.xyGroup);
        return (this.xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(this.xyGroup)) {
        tetroFreezer.freezeTetro(this.xyGroup);
        scorer.processLineClears(this.xyGroup);
        return (this.xyGroup = null);
      }

      painter.unpaintTetro(this.xyGroup);
      this.xyGroup = mover.moveTetroBottom(this.xyGroup);
      painter.paintTetro(this.xyGroup);
    }
  },
};

export default processor;
