const tetris = document.getElementById("tetris");
const rows = parseInt(tetris.getAttribute("rows"));
const columns = parseInt(tetris.getAttribute("columns"));
let xyGroup = null;

export default function generateNewTetro() {
  const rndNum = getRandomInt(3, 9);
  initializeTetro();
  addLeft();
  addLeft();
  addLeft();
  paintTetro();
  return xyGroup;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

function initializeTetro() {
  xyGroup = [[0, Math.ceil(columns / 2)]];
}
function addLeft() {
  let nextXY = [...xyGroup[xyGroup.length - 1]];
  nextXY[1] = nextXY[1] - 1;
  xyGroup.push(nextXY);
}

function excludeAxisReverse() {}

function paintTetro() {
  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
}
