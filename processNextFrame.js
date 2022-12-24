import testProcessNextFrame from "./test.processNextFrame.js";
testProcessNextFrame();

export default function processNextFrame() {
  let cells = getCurrentXYGroupCells();
  const action = funnelConditionChecks();

  switch (action) {
    case "game over":
      handleGameOver();
      break;
    case "freeze":
      handleFreeze();
      break;

    default:
      handleMoveCurrentXYGroupCells();
  }
}

function funnelConditionChecks() {
  if (isUpperBoundHit()) return "game over";
  if (isFreeze()) return "freeze";
  return false;
}
function isUpperBoundHit() {
  return false;
}
function handleGameOver() {
  console.log("handling game over");
  return "game over";
}

function isFreeze() {
  if (nextMoveOverlapsFrozen() || nextMoveOverlapsBottomCell()) return "freeze";
}
function nextMoveOverlapsFrozen() {
  return "freeze";
}
function nextMoveOverlapsBottomCell() {
  return "freeze";
}
function handleFreeze() {
  console.log("handling freeze");
}

function getCurrentXYGroupCells() {
  return "curr cells";
}

function handleMoveCurrentXYGroupCells() {
  console.log("mv class by one vertically");
}

////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////
////
///
////
////

// const tetro = [
//     [0, 1],
//     [0, 2],
//     [0, 3],
//     [1, 3],
//   ];
//   // move tetro

//   tetro.forEach((el) => (el[0] = el[0] + 20));

//   // check vertical collision
//   const frozen = [
//     [23, 0],
//     [22, 0],
//     [21, 0],
//     [21, 1],
//     [21, 2],
//   ];

//   for (let xy of tetro) {
//     const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
//     cell.classList.add("black");
//   }

//   for (let xy of frozen) {
//     const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
//     cell.classList.add("black");
//     cell.classList.add("frozen");
//   }

//   const freeze = tetro.find((xy) => {
//     const nextVerticalCell = document.getElementById(
//       `cellXY-${xy[0] + 1}-${xy[1]}`
//     );
//     console.log(nextVerticalCell);
//     console.log([...nextVerticalCell.classList].includes("frozen"));
//     return [...nextVerticalCell.classList].includes("frozen");
//   });
