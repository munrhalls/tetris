import makeNewTetro from "./makeNewTetro.js";
import { checker } from "./../movers/checker.js";
import { mover } from "./../movers/mover.js";
import { rotator } from "./../movers/rotator.js";
import { tetroFreezer } from "../freezer/tetroFreezer.js";
import { frozenChecker } from "../freezer/frozenChecker.js";
// import { scorer } from "../gameHandlers/scorer.js";

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

    unpaintTetro();
    xyGroup = mover.moveTetroBottom(xyGroup);
    paintTetro();
  }
}

initializeMovesInterface();

const clone = (items) =>
  items.map((item) => (Array.isArray(item) ? clone(item) : item));

function initializeMovesInterface() {
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

function unpaintTetro() {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}

function unpaintCell(xy) {
  if (xy[0] < 0) return;
  if (xy[1] < 0) return;
  if (xy[1] > columns) return;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.innerText = ``;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = `0px`;

  document
    .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
    .classList.remove(xyGroup.color);
}
function paintCell(xy) {
  if (xy[0] < 0) return;
  if (xy[1] < 0)
    throw new Error(`Square out of board in paint cell with ${xy[1]}.`);
  if (xy[1] > columns)
    throw new Error(`Square out of board in paint cell with ${xy[1]}.`);

  let cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);

  cell.classList.add("color");
  cell.classList.add(xyGroup.color);
  cell.innerText = `Y:${xy[0]} X:${xy[1]}`;
  cell.style.fontSize = "7px";
}
