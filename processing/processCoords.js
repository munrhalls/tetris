import { mover } from "../moving/mover.js";
import { checker } from "./checker.js";
import { frozenChecker } from "./frozenChecker.js";
import { painter } from "../displaying/painter.js";
import { tetroFreezer } from "../freezing/tetroFreezer.js";
import makeNewTetro from "../building/makeNewTetro.js";

let xyGroup = null;

const processCoords = function () {
  if (!xyGroup) {
    xyGroup = makeNewTetro();
  } else {
    if (checker.isAtBoundBottom(xyGroup)) {
      tetroFreezer.freezeTetro(xyGroup);
      return (xyGroup = null);
    }
    if (frozenChecker.isAtFrozenTetroBottom(xyGroup)) {
      tetroFreezer.freezeTetro(xyGroup);
      return (xyGroup = null);
    }

    painter.unpaintTetro(xyGroup);
    xyGroup = mover.moveTetroBottom(xyGroup);
    painter.paintTetro(xyGroup);
  }
};

export default processCoords;
