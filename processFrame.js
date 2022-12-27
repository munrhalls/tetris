let xyGroup = [];
let frozenGroups = [];

export default function processFrame() {
  if (!xyGroup.length) {
    xyGroup.push([0, 1]);
    xyGroup.push([0, 2]);
    xyGroup.push([1, 2]);
    xyGroup.push([2, 2]);

    for (let xy of xyGroup) {
      const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
      cell.classList.add("black");
    }
  }

  frozenGroups.push(xyGroup[0]);
  xyGroup.pop();
}
