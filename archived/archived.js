// archived_flipTetro: function flipTetro(xyGroup) {
//     let flippingGroup = processor.xyGroup.map((square) =>
//       square.map((coord) => coord)
//     );
//     flippingGroup.color = processor.xyGroup.color;

//     const sort = flippingGroup.sort((a, b) => a[0] > b[0]);
//     const min = sort[0][0];
//     const max = sort[sort.length - 1][0];
//     const height = max - min;
//     const mid = min + height / 2;

//     let aboveMid = [];
//     let belowMid = [];
//     for (let yx of flippingGroup) {
//       if (yx[0] < mid) {
//         aboveMid.push(yx);
//       }
//       if (yx[0] > mid) {
//         belowMid.push(yx);
//       }
//     }

//     for (let yx of aboveMid) {
//       yx[0] = yx[0] + (mid - yx[0]) * 2;
//     }
//     for (let yx of belowMid) {
//       yx[0] = yx[0] + (mid - yx[0]) * 2;
//     }

//     if (frozenChecker.isCrossingFrozenTetro(flippingGroup))
//       return processor.xyGroup;
//     for (let yx of flippingGroup) {
//       yx.color = flippingGroup.color;
//     }
//     flippingGroup.lastRotation = xyGroup.lastRotation;
//     return flippingGroup;
//   },
//   archived_rotateTetroClockwise: function archived_rotateTetroClockwise(
//     xyGroup
//   ) {
//     let rails = calculator.getVirtualRails(xyGroup);

//     processor.xyGroup.freeze = false;
//     let rotationGroup = [
//       ...processor.xyGroup.map((square) => [...square.map((coord) => coord)]),
//     ];
//     rotationGroup.color = processor.xyGroup.color;

//     for (let square of rotationGroup) {
//       let y = square[0];
//       let x = square[1];
//       square.color = rotationGroup.color;
//       // const distanceXtoLeftBorder = x - rails.left;
//       // const distanceYtoTopBorder = y - rails.top;
//       const relativeDistanceOfXFromXMid = square[1] - Math.ceil(rails.xmid);
//       const relativeDistanceOfYFromYMid = square[0] - Math.ceil(rails.ymid);
//       square[0] = Math.ceil(rails.ymid) + relativeDistanceOfXFromXMid;
//       square[1] = Math.ceil(rails.xmid) + relativeDistanceOfYFromYMid;

//       if (xyGroup.lastRotation === "counterClockwise") {
//         square[1] = square[1] + Math.floor(rails.bot - rails.top);
//       }
//     }

//     rotationGroup.lastRotation = "clockwise";
//     const pass = calculator.handleRotationChecks(rotationGroup);
//     if (!pass) return processor.xyGroup;
//     if (pass && rails.freeze === true) rotationGroup.freeze = true;
//     return rotationGroup;
//   },

// this.updateFrozenTetroes(xyGroup);
// this.handleLineClears();
// },
// handleLineClears: function handleLineClears() {
//   // on freeze, loop all rows
//   // get length for every row, check if equal to columns
//   const rows = [...document.getElementsByClassName("row")];
//   for (let row of rows) {
//     const frozenCells = [...row.children].filter((cell) =>
//       [...cell.classList].includes("frozen")
//     );

//     if (columns === frozenCells.length) {
//       for (let cell of frozenCells) {
//         const domCell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
//         domCell.classList.remove("frozen");
//         let index = [...domCell.classList].indexOf("color");
//         [...domCell.classList][index + 1] = "";
//       }
//     }
//   }
// },
// updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
//   this.frozenTetroes.push(xyGroup);
// },
