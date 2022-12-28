const tetris = document.getElementById("tetris");
const columns = parseInt(tetris.getAttribute("columns"));

export default function makeNewTetro() {
  let xyGroup = [[0, Math.ceil(columns / 2)]];

  const top = [-1, 0];
  const bottom = [1, 0];
  const left = [0, -1];
  const right = [0, 1];

  const rndSize = getRandomInt(3, 18);
  const rndDir = getRandomInt(0, 3);
  const axis = ["vertical", "horizontal"];
  const vertical = ["top", "bottom"];
  const horizontal = ["left", "right"];

  let lengths = [];

  let toggleAxis = axis[getRandomInt(0, 2)];

  for (let i = 0; i < rndSize; i++) {
    toggleAxis = toggleAxis === "vertical" ? "horizontal" : "vertical";
    console.log(toggleAxis);
    // lengths.push([dir, dirLength]);
  }
  console.log(lengths);

  return xyGroup;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
