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
      // tests
      this.xyGroup = [
        [12, 7],
        [12, 8],
        [11, 8],
        [11, 7],
        // [11, 7],
        // [11, 8],
        // [11, 9],
        // [10, 7],
        // [10, 8],
        // [12, 10],
        // [12, 11],
        // [12, 12],
      ];
      this.xyGroup.color = "purple";
      this.xyGroup[0].color = "blue";
      this.xyGroup[1].color = "green";
      this.xyGroup[2].color = "red";
      this.xyGroup[3].color = "orange";
      let count = 0;
      for (let square of this.xyGroup) {
        // square.color = "purple";
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
