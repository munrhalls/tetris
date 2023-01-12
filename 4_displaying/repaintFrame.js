import runner from "../2_running/runner.js";
import processCoords from "../3_processing/processCoords.js";

let xyGroup = null;

export default function repaintFrame() {
  runner.checkGameOver();
  processCoords();
}
