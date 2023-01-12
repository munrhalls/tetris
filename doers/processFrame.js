import makeNewTetro from "./makeNewTetro.js";
import { checker } from "./../movers/checker.js";
import { mover } from "./../movers/mover.js";
import { rotator } from "./../movers/rotator.js";
import { tetroFreezer } from "../freezer/tetroFreezer.js";
import { frozenChecker } from "../freezer/frozenChecker.js";
import { moverInterface } from "./../movers/moverInterface.js";
import { painter } from "../displaying/painter.js";

let xyGroup = null;
const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
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

moverInterface(xyGroup);

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
