const tetris = document.getElementById("tetris");
const columns = parseInt(tetris.getAttribute("columns"));

export default function makeNewTetro() {
  let xyGroup = [[0, Math.floor(columns / 2)]];

  rndLineAtRndDir(xyGroup);
  rndLineAtRndDir(xyGroup);
  rndLineAtRndDir(xyGroup);

  return xyGroup;
}

function rndLineAtRndDir(xyGroup) {
  let rndAxis = ["vertical", "horizontal"][getRandomInt(0, 2)];
  let rndNum = getRandomInt(1, 8);

  for (let i = 0; i < rndNum; i++) {
    let lastSquare = [...xyGroup[xyGroup.length - 1]];
    if (lastSquare?.length !== 2)
      throw new Error("Generating new tetro, improper variable set.");

    if (rndAxis === "vertical") {
      lastSquare[0] += -1;
    }
    if (rndAxis === "horizontal") {
      lastSquare[1] += -1;
    }
    xyGroup.push(lastSquare);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function up(xy) {
  return [xy[0] + -1, xy[1]];
}
