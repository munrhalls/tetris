export default function processNextFrame() {
  let cells = getCurrentXYGroupCells();
  console.log(cells);
}

function getCurrentXYGroupCells() {
  return "curr cells";
}

function 


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
