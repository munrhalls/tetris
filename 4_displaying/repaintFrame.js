import checker from "../3_processing/checker.js";
import processor from "../3_processing/processor.js";

let xyGroup = null;

export default function repaintFrame() {
  checker.checkGameOver();
  processor.processCoordSys();
}
