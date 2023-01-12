import { checker } from "../3_processing/checker.js";
import { mover } from "../3_processing/mover.js";
import { rotator } from "../3_processing/rotator.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";
import { frozenChecker } from "../3_processing/frozenChecker.js";

export default function makeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (!window.runGame) return;
    if (!xyGroup) return;
    // LEFT
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
    // RIGHT
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
    // DOWN
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
    // FLIP
    if (e.code === "KeyW") {
      unpaintTetro();
      xyGroup = rotator.flipTetro(xyGroup);
      paintTetro();
    }
    // ROTATE COUNTERCLOCKWISE
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
    // ROTATE CLOCKWISE
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
