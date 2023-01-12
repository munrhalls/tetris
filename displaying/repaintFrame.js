import makeNewTetro from "../building/makeNewTetro.js";
import runner from "../handlers/runner.js";
import { checker } from "../moving/checker.js";
import { initializeMovesInterface } from "../moving/initializeMovesInterface.js";
import { mover } from "../moving/mover.js";
import { rotator } from "../moving/rotator.js";
import { tetroFreezer } from "../freezing/tetroFreezer.js";
import { frozenChecker } from "../processing/frozenChecker.js";
import { painter } from "./painter.js";
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));
let xyGroup = null;

initializeMovesInterface();

export default function repaintFrame() {
  runner.checkGameOver();
  if (!runner.runGame) return;

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
}
