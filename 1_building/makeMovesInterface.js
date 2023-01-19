import runner from "../2_running/runner.js";
import checker from "../3_processing/checker.js";
import { mover } from "../3_processing/mover.js";
import { rotator } from "../3_processing/rotator.js";
import processor from "../3_processing/processor.js";
import { frozenChecker } from "../3_processing/frozenChecker.js";
import { tetroFreezer } from "../4_displaying/tetroFreezer.js";
import { painter } from "../4_displaying/painter.js";

export default function makeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (!runner.runGame) return;
    if (!processor.xyGroup) return;
    // LEFT
    if (e.code === "ArrowLeft") {
      if (checker.isAtBoundLeft(processor.xyGroup)) return;
      if (frozenChecker.isAtFrozenTetroLeft(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }

      painter.unpaintTetro(processor.xyGroup);
      processor.xyGroup = mover.moveTetroLeft(processor.xyGroup);
      painter.paintTetro(processor.xyGroup);
    }
    // RIGHT
    if (e.code === "ArrowRight") {
      if (checker.isAtBoundRight(processor.xyGroup)) return;
      if (frozenChecker.isAtFrozenTetroRight(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        processor.xyGroup = null;
        return;
      }
      painter.unpaintTetro(processor.xyGroup);
      processor.xyGroup = mover.moveTetroRight(processor.xyGroup);
      painter.paintTetro(processor.xyGroup);
    }
    // DOWN
    if (e.code === "ArrowDown") {
      if (checker.isAtBoundBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      painter.unpaintTetro(processor.xyGroup);
      processor.xyGroup = mover.moveTetroBottom(processor.xyGroup);
      painter.paintTetro(processor.xyGroup);
    }
    // ROTATE COUNTERCLOCKWISE
    if (e.code === "KeyA") {
      if (checker.isAtBoundBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      painter.unpaintTetro(processor.xyGroup);
      processor.xyGroup = rotator.rotateTetroCounterClockwise(
        processor.xyGroup
      );
      if (processor.xyGroup.freeze) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }

      painter.paintTetro(processor.xyGroup);
    }
    // ROTATE CLOCKWISE
    if (e.code === "KeyD") {
      if (checker.isAtBoundBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      if (frozenChecker.isAtFrozenTetroBottom(processor.xyGroup)) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      painter.unpaintTetro(processor.xyGroup);
      processor.xyGroup = rotator.rotateTetroClockwise(processor.xyGroup);
      if (processor.xyGroup.freeze) {
        tetroFreezer.freezeTetro(processor.xyGroup);
        return (processor.xyGroup = null);
      }
      painter.paintTetro(processor.xyGroup);
    }
  });
}
