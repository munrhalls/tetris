const tetris = document.getElementById("tetris");
let xyGroup = null;
let frozenGroups = [];
let moveCommand = undefined;

export default function processFrame() {
  if (!xyGroup) {
    initializeTetro();
  } else {
    unpaintTetro();
    switch (moveCommand) {
      case "left":
        moveTetroLeft();
        break;
      case "right":
        moveTetroRight();
        break;
    }

    moveTetroDown();
    paintTetro();
    moveCommand = undefined;
  }
}

initializeMovesInterface();

function initializeMovesInterface() {
  window.addEventListener("keydown", function (e) {
    if (e.code === "ArrowLeft") {
      moveCommand = "left";
    }
    if (e.code === "ArrowRight") {
      moveCommand = "right";
    }
  });
}

function initializeTetro() {
  xyGroup = [
    [0, 1],
    [0, 2],
    [1, 2],
    [2, 2],
  ];

  for (let xy of xyGroup) {
    document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
  }
}

function unpaintTetro() {
  for (let xy of xyGroup) {
    unpaintCell(xy);
  }
}
function unpaintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.remove("black");
}
function moveTetroLeft() {
  for (let xy of xyGroup) {
    xy[1] = xy[1] - 1;
  }
}
function moveTetroRight() {
  for (let xy of xyGroup) {
    xy[1] = xy[1] + 1;
  }
}
function moveTetroDown() {
  for (let xy of xyGroup) {
    xy[0] = xy[0] + 1;
  }
}
function paintTetro() {
  for (let xy of xyGroup) {
    paintCell(xy);
  }
}
function paintCell(xy) {
  document.getElementById(`cellXY-${xy[0]}-${xy[1]}`).classList.add("black");
}