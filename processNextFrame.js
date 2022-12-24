import testProcessNextFrame from "./test.processNextFrame.js";
testProcessNextFrame();

export default function processNextFrame() {
  const currXYCells = [...document.getElementsByClassName("current")];
  const action = funnelConditionChecks(currXYCells);

  switch (action) {
    case "game over":
      handleGameOver();
      break;
    case "freeze":
      handleFreeze(currXYCells);
      break;
    case "illegal move":
      handleIllegalMove(currXYCells);
    case "pass":
      handleMoveCurrentXYGroupCells(currXYCells);
    default:
      throw new Error("Funnel @processNextFrame leaks. Porous checks.");
  }
}

function funnelConditionChecks(currXYCells) {
  if (isUpperBoundHit(currXYCells)) return "game over";
  if (nextMoveOverlapsFrozen(currXYCells)) return "freeze";
  if (nextMoveOverlapsBottomCell(currXYCells)) return "freeze";
  if (nextMoveOverlapsHorizontalBounds(currXYCells)) return "illegal move";
  return "pass";
}
function isUpperBoundHit(currXYCells) {
  console.log(currXYCells);
  return true;
}

function nextMoveOverlapsFrozen(currXYCells) {
  return "freeze";
}
function nextMoveOverlapsBottomCell(currXYCells) {
  return "freeze";
}
function nextMoveOverlapsHorizontalBounds(currXYCells) {
  return "illegal move";
}

function handleGameOver() {
  console.log("handling game over");
}
function handleFreeze(currXYCells) {
  console.log("handling freeze");
}
function handleIllegalMove(currXYCells) {
  console.log("handle illegal move");
}
function handleMoveCurrentXYGroupCells(currXYCells) {
  console.log("mv class by one vertically");
}

// function getCurrentXYGroupCells() {
//   console.log("curr cells");
// }

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
