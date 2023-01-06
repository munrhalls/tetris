import { freezer } from "../freezer/freezer";

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([20, i]);
  }

  freezer.freezeTetro(mockxyGroup);
}, 500);


setTimeout(() => {
    let mockxyGroup = [];
    for (let i = 0; i < 16; i++) {
      mockxyGroup.push([20, i]);
    }
    mockxyGroup[15][0] = 20;
    freezer.freezeTetro(mockxyGroup);
  
    mockxyGroup = [];
    for (let i = 16; i < 22; i++) {
      mockxyGroup.push([20, i]);
    }
    mockxyGroup[3][0] = 21;
    freezer.freezeTetro(mockxyGroup);
  }, 500);