// frozen manager gathers all frozen roles
// processes line marks and gives it over to scorer properly
// launches freezing tetro, to tracking, marking, clearing frozen lines properly
const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { tetroFreezer } from "./tetroFreezer.js";
import { frozenTracker } from "./frozenTracker.js";
import { frozenMarker } from "./frozenMarker.js";
import { frozenClearer } from "./frozenClearer.js";

export const frozenManager = {
  handleTetroFreeze: function handleTetroFreeze(xyGroup) {
    return xyGroup;
  },
};
