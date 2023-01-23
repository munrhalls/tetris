import runner from "../handlers/runner.js";
import processCoords from "../../3_processing/processor.js";

let xyGroup = null;

export default function repaintFrame() {
  runner.checkGameOver();
  processCoords();
}
