import makeNewTetro from "../building/makeNewTetro.js";
import { checker } from "../moving/checker.js";
import { initializeMovesInterface } from "../moving/initializeMovesInterface.js";
import { mover } from "../moving/mover.js";
import { rotator } from "../moving/rotator.js";
import { tetroFreezer } from "../freezing/tetroFreezer.js";
import { frozenChecker } from "../freezing/frozenChecker.js";
import { painter } from "./painter.js";
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));
let xyGroup = null;

export default function repaintFrame() {
  if (isGameOver()) return localStorage.setItem("isGameOver", "true");

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

function isGameOver() {
  let isGameOver = false;
  for (let frozenTetro of tetroFreezer.frozenTetroes) {
    for (let xy of frozenTetro) {
      if (parseInt(xy[0]) < 1) {
        isGameOver = true;
        break;
      }
    }
  }
  return isGameOver;
}
