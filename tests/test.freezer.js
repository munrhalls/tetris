import { freezer } from "../freezer/freezer";

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([20, i]);
  }

  freezeTetrofreezeTetro(mockxyGroup);
}, 500);

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 16; i++) {
    mockxyGroup.push([20, i]);
  }
  mockxyGroup[15][0] = 20;
  freezeTetrofreezeTetro(mockxyGroup);

  mockxyGroup = [];
  for (let i = 16; i < 22; i++) {
    mockxyGroup.push([20, i]);
  }
  mockxyGroup[3][0] = 21;
  freezeTetrofreezeTetro(mockxyGroup);
}, 500);
