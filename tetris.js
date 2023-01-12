import makeBoard from "./building/makeBoard.js";
import makeGameInterface from "./building/makeGameInterface.js";
import runner from "./handlers/runner.js";

const tetris = document.getElementById("tetris");
const gameOver = document.getElementById("gameOver");
let frequency = 50;

function makeGame() {
  makeBoard();
  makeGameInterface();
  runner.runGame(frequency);
}

document.addEventListener("DOMContentLoaded", makeGame);
