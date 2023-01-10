const columns = parseInt(tetris.getAttribute("columns"));
const rows = parseInt(tetris.getAttribute("rows"));
import { frozenTracker } from "./frozenTracker.js";
import { frozenMarker } from "./frozenMarker.js";
import { frozenClearer } from "./frozenClearer.js";

export const tetroFreezer = {
  frozenTetroes: [],
  resetTetro: function resetTetro(xyGroup) {
    xyGroup = null;
  },
  freezeCell: function freezeCell(xy) {
    const cell = document.getElementById(`cellXY-${xy[0]}-${xy[1]}`);
    cell.classList.add("frozen");
    cell.classList.add("black");
  },
  freezeTetro: function freezeTetro(xyGroup) {
    for (let xy of xyGroup) {
      if (xy[0] < 0) return;
      this.freezeCell(xy);
    }
    const trackedLines = frozenTracker.updateFrozenLines(xyGroup);
    const markedLines = frozenMarker.markLines(trackedLines);
    const clearedLines = frozenClearer.clearLines(markedLines);
    frozenTracker.updateAfterClear(clearedLines);
    frozenClearer.clearCells;
    //
    // frozen clearer clears lines
    // frozen clearer gives cleared lines to freeze tetro
    // frozen tracker updates

    // let clearedLines = frozenClearer.clearFullyFrozenLines(markedLines);
    // frozenTracker.updateAfterClear(clearedLines);
    // tetris is re-configured
    // building
    //-makeBoard
    //-makeNewTetro

    // displaying
    //-frameAnimator
    //-painter

    // processing
    //-centralFrameProcessor

    // moving
    //-all movers

    // freezing

    // game managing
    //-runner
    //-scorer

    // get cell painter

    // when a line clear is achieved, it's composed of multiple tetroes
    // cells are part of 1 line clear but of multiple tetroes

    // first frozenTetroes update equuals to:
    // store frozenTetroesUpdate

    // all linesToClear are looped, one by one
    // frozenClearer.
    // all tetroes are looped one by one
    // all cells from a tetro equal to cells filter looped one by one
    // every cell is compared for intersection with line clear
    // if cell is not part of line clear, move on
    // if cell is part of line clear
    // it's filtered out of tetro
    // it undergoes unpaintCell by cell painter

    //and then every cell looped again
    //. chain after filter
    // adjusted after clear cells
    // every cell is compared to being above line clear (smaller or equal to)
    // if not smaller or equal to, move on
    // if smaller or equal to, unpaint cell
    // move y down by 1 (make bigger by 1)
    // paint cell

    // after all that looping is complete
    // all frozenTetroes cells that were part of line clears are cleared from tetroes
    // all above line clear, each time, unpainted
    // properly moved south by line clear (1)
    // painted after that

    // return frozenTetroesAfterLineClears
    // tetroFreezer updates frozen tetroes with frozenTetroesAfterLineClears

    // this.updateFrozenTetroes(clearedFrozenTetroes);

    this.resetTetro(xyGroup);
    return xyGroup;
  },
  updateFrozenTetroes: function updateFrozenTetroes(xyGroup) {
    this.frozenTetroes.push(xyGroup);
  },
  testNoFrozenOverlap: function testNoFrozenOverlap() {
    if (this.frozenLines.find((line) => line.frozenCells.length > columns)) {
      throw new Error(
        "More than one frozen tetrominoe occupies the same cell."
      );
    }
  },
};

setTimeout(() => {
  let mockxyGroup = [];
  for (let i = 0; i < 22; i++) {
    mockxyGroup.push([20, i]);
    mockxyGroup.push([21, i]);
    mockxyGroup.push([22, i]);

    mockxyGroup.push([24, i]);
  }
  for (let i = 5; i < 16; i++) {
    mockxyGroup.push([17, i]);
  }
  tetroFreezer.freezeTetro(mockxyGroup);
}, 300);
