import makeBoard from "./1_building/makeBoard.js";
import makeGameInterface from "./1_building/makeGameInterface.js";
import makeMovesInterface from "./1_building/makeMovesInterface.js";

const tetris = document.getElementById("tetris");
const end = document.getElementById("end");

function makeGame() {
  makeBoard();
  makeGameInterface();
  makeMovesInterface();
}

document.addEventListener("DOMContentLoaded", makeGame);
