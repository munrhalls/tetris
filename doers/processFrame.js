import makeNewTetro from "./makeNewTetro.js";
import { checker } from "./../movers/checker.js";
import { mover } from "./../movers/mover.js";
import { rotator } from "./../movers/rotator.js";
import { freezer } from "./../freezer/freezer.js";
let xyGroup = null;

const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));

export default function processFrame() {
  if (isGameOver()) return localStorage.setItem("isGameOver", "true");

  if (!xyGroup) {
    xyGroup = makeNewTetro();
  } else {
    if (checker.isAtBoundBottom(xyGroup))
      return (xyGroup = freezer.freezeTetro(xyGroup));

    if (freezer.isAtFrozenTetroBottom(xyGroup))
      return (xyGroup = freezer.freezeTetro(xyGroup));

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
      if (freezer.isAtFrozenTetroLeft(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));

      unpaintTetro();
      xyGroup = mover.moveTetroLeft(xyGroup);
      paintTetro();
    }
    if (e.code === "ArrowRight") {
      if (checker.isAtBoundRight(xyGroup)) return;
      if (freezer.isAtFrozenTetroRight(xyGroup)) {
        freezer.freezeTetro(xyGroup);
        xyGroup = null;
        return;
      }
      unpaintTetro();
      xyGroup = mover.moveTetroRight(xyGroup);
      paintTetro();
    }
    if (e.code === "ArrowDown") {
      if (checker.isAtBoundBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));
      if (freezer.isAtFrozenTetroBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));

      unpaintTetro();
      xyGroup = mover.moveTetroBottom(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyW") {
      unpaintTetro();
      xyGroup = rotator.flipTetroY(xyGroup);
      paintTetro();
    }

    if (e.code === "KeyA") {
      if (checker.isAtBoundBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));
      if (freezer.isAtFrozenTetroBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));

      unpaintTetro();
      xyGroup = rotator.rotateTetroCounterClockwise(xyGroup);
      if (xyGroup.freeze) return (xyGroup = freezer.freezeTetro(xyGroup));
      paintTetro();
    }

    if (e.code === "KeyD") {
      if (checker.isAtBoundBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));
      if (freezer.isAtFrozenTetroBottom(xyGroup))
        return (xyGroup = freezer.freezeTetro(xyGroup));

      unpaintTetro();
      xyGroup = rotator.rotateTetroClockwise(xyGroup);
      if (xyGroup.freeze) return (xyGroup = freezer.freezeTetro(xyGroup));
      paintTetro();
    }
  });
}

function isGameOver() {
  let isGameOver = false;
  for (let frozenTetro of freezer.frozenTetroes) {
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
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}
function paintCell(xy) {
  if (xy[0] < 0) return;
  if (xy[1] < 0)
    throw new Error(`Square out of board in paint cell with ${xy[1]}.`);
  if (xy[1] > columns)
    throw new Error(`Square out of board in paint cell with ${xy[1]}.`);

  document
    .getElementById(`cellXY-${xy[0]}-${xy[1]}`)
    .classList.add(xyGroup.color);
  document.getElementById(
    `cellXY-${xy[0]}-${xy[1]}`
  ).innerText = `Y:${xy[0]} X:${xy[1]}`;
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).style.fontSize = "7px";
}
