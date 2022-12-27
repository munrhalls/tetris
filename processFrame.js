const rows = document.getElementsByClassName("row");
console.log([...document.getElementsByTagName("main")].length);
console.log(rows);
setTimeout(() => {
  console.log([...rows]);
}, 100);

const columns = 16;
let xyGroup = null;
let frozenGroups = [];

export default function processFrame() {
  if (!xyGroup) {
    initializeTetro();
  } else {
    moveTetro();
  }
}

function initializeTetro() {
  xyGroup = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  for (let xy of xyGroup) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("black");
  }
}

function moveTetro() {
  // xy 0 = i; until
}
