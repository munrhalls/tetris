if (rotationGroup.quadrant === 4) {
  let square = rotationGroup.square;
  square[0] = square[0] - 3;
  square[1] = square[1] - 3;
  rotationGroup.square2[0] = rotationGroup.square2[0] - 4;
  rotationGroup.square2[1] = rotationGroup.square2[1] - 2;

  rotationGroup.square3[0] = rotationGroup.square3[0] - 2;
  rotationGroup.square3[1] = rotationGroup.square3[1] - 4;

  rotationGroup.square4[0] = rotationGroup.square4[0] - 1;
  rotationGroup.square4[1] = rotationGroup.square4[1] - 3;

  rotationGroup.square5[0] = rotationGroup.square5[0] + 2;
  rotationGroup.square5[1] = rotationGroup.square5[1] + 2;
}
if (rotationGroup.quadrant === 3) {
  let square = rotationGroup.square;
  square[0] = square[0] + 3;
  square[1] = square[1] - 3;
  rotationGroup.square2[0] = rotationGroup.square2[0] + 2;
  rotationGroup.square2[1] = rotationGroup.square2[1] - 4;

  rotationGroup.square3[0] = rotationGroup.square3[0] + 4;
  rotationGroup.square3[1] = rotationGroup.square3[1] - 2;

  rotationGroup.square4[0] = rotationGroup.square4[0] + 3;
  rotationGroup.square4[1] = rotationGroup.square4[1] - 1;

  rotationGroup.square5[0] = rotationGroup.square5[0] - 2;
  rotationGroup.square5[1] = rotationGroup.square5[1] + 3;
}
if (rotationGroup.quadrant === 2) {
  let square = rotationGroup.square;
  square[0] = square[0] + 3;
  square[1] = square[1] + 3;
  rotationGroup.square2[0] = rotationGroup.square2[0] + 4;
  rotationGroup.square2[1] = rotationGroup.square2[1] + 2;

  rotationGroup.square3[0] = rotationGroup.square3[0] + 2;
  rotationGroup.square3[1] = rotationGroup.square3[1] + 4;

  rotationGroup.square4[0] = rotationGroup.square4[0] + 1;
  rotationGroup.square4[1] = rotationGroup.square4[1] + 3;

  rotationGroup.square5[0] = rotationGroup.square5[0] - 2;
  rotationGroup.square5[1] = rotationGroup.square5[1] - 2;
}
if (rotationGroup.quadrant === 1) {
  let square = rotationGroup.square;
  square[0] = square[0] - 3;
  square[1] = square[1] + 3;
  rotationGroup.square2[0] = rotationGroup.square2[0] - 2;
  rotationGroup.square2[1] = rotationGroup.square2[1] + 4;

  rotationGroup.square3[0] = rotationGroup.square3[0] - 4;
  rotationGroup.square3[1] = rotationGroup.square3[1] + 2;

  rotationGroup.square4[0] = rotationGroup.square4[0] - 3;
  rotationGroup.square4[1] = rotationGroup.square4[1] + 1;

  rotationGroup.square5[0] = rotationGroup.square5[0] + 2;
  rotationGroup.square5[1] = rotationGroup.square5[1] - 3;
}
