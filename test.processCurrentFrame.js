export default function testProcessCurrentFrame() {
  if (!document.getElementsByClassName("current")[0]) {
    const xyGroup = generateNewXYGroup();
    if (!xyGroup) throw new Error("XY Group unset.");

    for (let xy of xyGroup) {
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      cell.classList.add("current");
      cell.classList.add("black");
      if (![...cell.classList].includes("current"))
        throw new Error("Class modifier @DOM cell not set.");
      if (![...cell.classList].includes("black"))
        throw new Error("Class modifier @DOM cell not set.");
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
