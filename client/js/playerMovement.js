/**
 * Handles our player movement. called from mouseHandler and main.
 */


/**
 * Checks if our player is the one currently playing.
 * Setting it to a local variable if so.
 * @param {object} player 
 * @param {string} id 
 */
function checkPlayer(player, id) {
  if (player.playBy == id) {
    setPlayer(player);
  }
}

function setPlayer(incPlayer) {
  player = incPlayer;
};
function getPlayer() {
  return player;
};

/**
 * Accepts a rounded down posX&posY from 0-9.
 * Checks if step has been made before in g_steps.
 * Returns a highlight at the grid position multiplied for canvas
 * @param {int} posX 
 * @param {int} posY 
 */
function movePlayerTo(posX, posY) {
  // Checks if we are clicking ourselves.
  if (checkValidMoves(posX, posY)) {
    const newStep = { step: { x: posX, y: posY } };
    if (g_steps.length > 0) {
      const lastStep = g_steps.pop();
      if (lastStep.step.x === newStep.step.x && lastStep.step.y === newStep.step.y) {
        g_steps.push(lastStep);
        return;
      } else {
        g_steps.push(lastStep);
      }
    }
    /**
     * multiplies for our canvas.
     */
    g_steps.push(newStep);
  }
};



/**
 * Checks if the sum of the positions selected are 0
 * thus meaning the character selected himself.
 * only returns true if the sum of the positions is not 0.
 * @param {int} posX 
 * @param {int} posY 
 */
function checkValidMoves(posX, posY) {
  let myPlayer = getPlayer();
  let gridPosition = {
    x: posX,
    y: posY
  };
  // Distance between two points.
  let distX = gridPosition.x - myPlayer.entityPos.tileX;
  let distY = gridPosition.y - myPlayer.entityPos.tileY;

  if (distX + distY != 0) return true;
};
// Shows for both directions
// ----------------UNUSED!!!--------------------
function showValid(dist, posX, posY) {
  switch (Math.abs(dist)) {
    case dist = 1:
      g_sprites.validWalk.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
      break;
    case dist = 2:
      g_sprites.invalidWalk.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
      break;
    default:

  }
}