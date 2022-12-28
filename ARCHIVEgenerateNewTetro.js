const tetris = document.getElementById("tetris");
const columns = parseInt(tetris.getAttribute("columns"));
let xyGroup = [[0, Math.ceil(columns / 2)]];

export default function generateNewTetro() {
  const xyGroup = buildRandomly();
  paintTetro();
  return xyGroup;
}
function buildRandomly() {
  const size = getRandomInt(2, 16);
  let turn = "bottom";

  let rndDirection = ["top", "bottom", "left", "right"][getRandomInt(0, 4)];
  let length = getRandomInt(1, 8);

  let isTopOut = xyGroup[xyGroup.length - 1][0] + length < 0;
  if (rndDirection === "top" && isTopOut) rndDirection = "bottom";
  if (rndDirection === "top" && isTopOut) rndDirection = "bottom";
}
// function buildSquare(buildMove) {
//   if (typeof buildMove !== "string")
//     throw new Error("Missing function argument @generate new tetro.");
//   let nextXY = [...xyGroup[xyGroup.length - 1]];
//   if (buildMove === "left") nextXY[1] = nextXY[1] - 1;
//   if (buildMove === "right") nextXY[1] = nextXY[1] + 1;
//   if (buildMove === "bottom") nextXY[0] = nextXY[0] + 1;
//   if (buildMove === "top") nextXY[1] = nextXY[0] - 1;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function paintTetro() {
  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
}

// function buildSequence() {
//   buildMoves = [];
//   setBuildMoves();
//   for (let i = 0; i < buildMoves.length; i++) {
//     const buildMove = buildMoves[i];
//     buildSquare(buildMove);
//   }
//   buildMoves = null;
// }
// function setBuildMoves() {
//   let direction = getRndDirection();
//   const steps = getRandomInt(1, 8);

//   let topCheck = 0;
//   if (direction === "top") topCheck--;
//   if (topCheck < 0) {
//     direction = "bottom";
//     topCheck = 0;
//   }

//   let leftCheck = 0;
//   if (direction === "left") leftCheck--;
//   if (leftCheck < 0) {
//     direction = "bottom";
//     leftCheck = 0;
//   }

//   let rightCheck = 0;
//   if (direction === "right") right++;
//   if (rightCheck > columns) {
//     direction = "bottom";
//     rightCheck = columns;
//   }

//   for (let i = 0; i < steps; i++) {
//     buildMoves.push(direction);
//   }
//   console.log(buildMoves);
// }

// function buildSquare(buildMove) {
//   if (typeof buildMove !== "string")
//     throw new Error("Missing function argument @generate new tetro.");
//   let nextXY = [...xyGroup[xyGroup.length - 1]];
//   if (buildMove === "left") nextXY[1] = nextXY[1] - 1;
//   if (buildMove === "right") nextXY[1] = nextXY[1] + 1;
//   if (buildMove === "bottom") nextXY[0] = nextXY[0] + 1;
//   if (buildMove === "top") nextXY[1] = nextXY[0] - 1;

//   xyGroup.push(nextXY);
// }

// function initializeTetro() {
//   xyGroup = [[0, Math.ceil(columns / 2)]];
// }

// function getRndDirection() {
//   const dirs = ["top", "bottom", "left", "right"];
//   return dirs[getRandomInt(0, 4)];
// }

// function paintTetro() {
//   for (let xy of xyGroup) {
//     document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
//   }
// }
