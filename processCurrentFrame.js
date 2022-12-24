export default function processCurrentFrame() {
  if (!document.getElementsByClassName("current")[0]) {
    const xyGroup = generateNewXYGroup();

    for (let xy of xyGroup) {
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      cell.classList.add("current");
      cell.classList.add("black");
    }
  }
}

function generateNewXYGroup() {
  // procedurally randomize or generate new xyGroup
  // init mock
  const xyGroup = [
    [0, 5],
    [0, 6],
    [0, 7],
    [1, 7],
  ];
  return xyGroup;
}
