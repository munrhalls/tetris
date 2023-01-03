const yMid = ySort[aboveMid.length][0];
const xMid = xSort[leftMid.length][1];
console.log("mid yx: ", yMid, xMid);

for (let i = 0; i < aboveMid.length; i++) {
  const moveYTo = yMid - (aboveMid[i][1] - xMid);
  const moveXTo = xMid + (aboveMid[i][0] - yMid);
  console.log("move to yx: ", moveYTo, moveXTo);
  aboveMid[i][0] = moveYTo;
  aboveMid[i][1] = moveXTo;
}

for (let i = 0; i < belowMid.length; i++) {
  console.log(xMid);
  const moveYTo = yMid + (xMid - belowMid[i][1]);
  console.log(xMid - belowMid[i][1]);
  const moveXTo = xMid + (belowMid[i][0] - yMid);
  belowMid[i][0] = moveYTo;
  belowMid[i][1] = moveXTo;
}




function getRows(xyGroup) {
    const allx = xyGroup.map((yx) => yx[1]).sort((a, b) => a > b);
    const xmid = allx[0] + (allx[allx.length - 1] - allx[0]) / 2;
    const ally = xyGroup.map((yx) => yx[0]).sort((a, b) => a > b);
    const ymid = ally[0] + (ally[ally.length - 1] - ally[0]) / 2;
  
    console.log("ymid", ymid, "xmid", xmid);
    
    let prev;
    let rows = [];
    ally.forEach((y) => {
      let row = xyGroup.filter((yx) => yx[0] === y);
      if (y !== prev) {
        rows.push(row);
      }
      prev = y;
    });
    return rows;
  }