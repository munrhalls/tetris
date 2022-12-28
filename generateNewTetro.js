export default function generateNewTetro() {
  let xyGroup = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 4],
  ];

  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
  return xyGroup;
}
