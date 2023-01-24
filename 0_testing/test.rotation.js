import makeNewTetro from "../1_building/makeNewTetro.js";
import { rotator } from "../3_processing/rotator.js";

// 1.Tetrominoe start positions, should be equal after rotating N-times when N is divisible by 4.
// 2. Should be true for both clockwise & counterclockwise.
// 3. Should be true for alternating between clockwise & counterclockwise.
// 4. Should work for varied kinds of tetrominoes.

function testRotation() {
  for (let i = 0; i < 50; i++) {
    let tetro = makeNewTetro();
    const tetroSave = [...tetro];
    runRotationTests(tetroSave, tetro);
  }
}

function runRotationTests(tetroSave, tetro) {
  console.log("Testing rotation..");

  testCounterClockwise(tetroSave, tetro);
  testClockwise(tetroSave, tetro);
  testBoth(tetroSave, tetro);
}

function testCounterClockwise(tetroSave, tetro) {
  for (let i = 0; i < 4 * 50; i++) {
    rotator.rotateTetroCounterClockwise(tetro);
  }
  const tetroAfter = [...tetro];

  let isEqual = true;
  for (let i = 0; i < tetroSave.length; i++) {
    if (
      tetroSave[i][0] !== tetroAfter[i][0] ||
      tetroSave[i][1] !== tetroAfter[i][1]
    ) {
      isEqual = false;
      throw new Error("Rotating tetro changes its position.");
      break;
    }
  }
  console.log("Counter-clockwise is proper: ", isEqual);
}

function testClockwise(tetroSave, tetro) {
  for (let i = 0; i < 4 * 50; i++) {
    rotator.rotateTetroClockwise(tetro);
  }
  const tetroAfter = [...tetro];

  let isEqual = true;
  for (let i = 0; i < tetroSave.length; i++) {
    if (
      tetroSave[i][0] !== tetroAfter[i][0] ||
      tetroSave[i][1] !== tetroAfter[i][1]
    ) {
      isEqual = false;
      throw new Error("Rotating tetro changes its position.");
      break;
    }
  }

  console.log("Clockwise is proper: ", isEqual);
}

function testBoth(tetroSave, tetro) {
  for (let i = 0; i < 4 * 50; i++) {
    const rndNum = getRandomInt(8);
    for (let j = 0; j < rndNum; j++) {
      rotator.rotateTetroClockwise(tetro);
    }
    for (let j = 0; j < rndNum; j++) {
      rotator.rotateTetroCounterClockwise(tetro);
    }
  }
  const tetroAfter = [...tetro];

  let isEqual = true;
  for (let i = 0; i < tetroSave.length; i++) {
    if (
      tetroSave[i][0] !== tetroAfter[i][0] ||
      tetroSave[i][1] !== tetroAfter[i][1]
    ) {
      isEqual = false;
      throw new Error("Rotating tetro changes its position.");
      break;
    }
  }

  console.log(
    "Alternating between clockwise & counter-clockwise is proper: ",
    isEqual
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default testRotation;

// get interface to outputs circuits
// do a huge number of iterations
// check for equality

// should not move the piece regardless of rotations/time

// should not leak color regardless of rotations/time

// rotating back and forth, not causing the square to move
// max - min -> both axis -> store larger one
// sort -> max - min, divide by 2, + min = mid
// do for y and x
// now, y mid + half larger axis, - half larger axis
// same for x
// got virtual square

// rotate left, get the virtual square right, left, top
// loop all squares
// x distance to right border = virt square right - x
// y distance to top border = y - virt square top
// now, y = virtual square left + x distance to right border
// now, x = virtual square top + y distance to top border
