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
