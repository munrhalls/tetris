const testAction = funnelConditionChecks();

export default function testProcessNextFrame() {
  if (testAction === undefined)
    throw new Error("Funnel does not return anything @processNextFrame.");

  switch (testAction) {
    case "game over":
      handleGameOver(testAction);
      break;
    case "freeze":
      handleFreeze(testAction);
      break;
    default:
      handleMoveCurrentXYGroupCells(testAction);
  }
}

function funnelConditionChecks() {
  if (isUpperBoundHit()) return "game over";
  let runsAfter = isUpperBoundHit();
  if (runsAfter)
    throw new Error("Guarded clause disrespected, code runs after.");

  if (isFreeze()) return "freeze";
  runsAfter = isFreeze();
  if (runsAfter)
    throw new Error("Guarded clause disrespected, code runs after.");

  return "default";
}
function isUpperBoundHit() {
  return false;
}
function handleGameOver() {
  if (action !== "game over")
    throw new Error("Switch statement action mismatch.");
  return "game over";
}

function isFreeze() {
  if (
    isCurrentGroupXYToHitAnyFrozenGroupXY() ||
    isCurrentGroupXYToHitBotBound()
  )
    return "freeze";
  runsAfter = isCurrentGroupXYToHitAnyFrozenGroupXY();
  if (runsAfter)
    throw new Error("Guarded clause disrespected, code runs after.");

  runsAfter = isCurrentGroupXYToHitBotBound();
  if (runsAfter)
    throw new Error("Guarded clause disrespected, code runs after.");
}
function isCurrentGroupXYToHitAnyFrozenGroupXY() {
  return "freeze";
}
function isCurrentGroupXYToHitBotBound() {
  return "freeze";
}
function handleFreeze(action) {
  if (action !== "freeze") throw new Error("Switch statement action mismatch.");
}

function getCurrentXYGroupCells() {
  return "curr cells";
}

function handleMoveCurrentXYGroupCells(testAction) {
  console.log(testAction);
  if (testAction) throw new Error("Switch statement action mismatch.");
  console.log("mv class by one vertically");
}
