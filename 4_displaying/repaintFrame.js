import runner from "../handlers/runner.js";
import processCoords from "../3_processing/processCoords.js";

let xyGroup = null;

export default function repaintFrame() {
  runner.checkGameOver();
  processCoords();
}
