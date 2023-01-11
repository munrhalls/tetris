import { checker } from "./../movers/checker.js";
import { mover } from "./../movers/mover.js";
import { rotator } from "./../movers/rotator.js";
import { tetroFreezer } from "../freezer/tetroFreezer.js";
import { frozenChecker } from "../freezer/frozenChecker.js";

export default function moverInterface(xyGroup) {
  window.addEventListener("keydown", function (e) {
    if (!window.runGame) return;
    if (!xyGroup) return;

    if (e.code === "ArrowLeft") {
      if (checker.isAtBoundLeft(xyGroup)) return;
      if (frozenChecker.isAtFrozenTetroLeft(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      unpaintTetro();
      xyGroup = mover.moveTetroLeft(xyGroup);
      paintTetro();
    }

    if (e.code === "ArrowRight") {
      if (checker.isAtBoundRight(xyGroup)) return;
      if (frozenChecker.isAtFrozenTetroRight(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        xyGroup = null;
        return;
      }
      unpaintTetro();
      xyGroup = mover.moveTetroRight(xyGroup);
      paintTetro();
    }

    if (e.code === "ArrowDown") {
      if (checker.isAtBoundBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      unpaintTetro();
      xyGroup = mover.moveTetroBottom(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyW") {
      unpaintTetro();
      xyGroup = rotator.flipTetro(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyA") {
      if (checker.isAtBoundBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      unpaintTetro();
      xyGroup = rotator.rotateTetroCounterClockwise(xyGroup);
      if (xyGroup.freeze) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      paintTetro();
    }

    if (e.code === "KeyD") {
      if (checker.isAtBoundBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(xyGroup)) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      unpaintTetro();
      xyGroup = rotator.rotateTetroClockwise(xyGroup);
      if (xyGroup.freeze) {
        tetroFreezer.freezeTetro(xyGroup);
        return (xyGroup = null);
      }
      paintTetro();
    }
  });
}
