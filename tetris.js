import makeBoard from "./1_building/makeBoard.js";
import makeGameInterface from "./1_building/makeGameInterface.js";
import makeMovesInterface from "./1_building/makeMovesInterface.js";
import runner from "./2_running/runner.js";

const tetris = document.getElementById("tetris");
const end = document.getElementById("end");
let frequency = 150;

function makeGame() {
  makeBoard();
  makeGameInterface();
  makeMovesInterface();
  runner.runGame(frequency);
}

document.addEventListener("DOMContentLoaded", makeGame);
