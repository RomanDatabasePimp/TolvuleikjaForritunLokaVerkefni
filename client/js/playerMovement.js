/**
 * Handles our player movement. called from mouseHandler and main.
 */

let player;

/**
 * Checks if our player is the one currently playing.
 * Setting it to a local variable if so.
 * @param {object} player 
 * @param {string} id 
 */
function checkPlayer(player,id){
    if(player.playBy == id) {
      setPlayer(player);
    }
  }
  
  function setPlayer(incPlayer){
    player = incPlayer;
  };
  function getPlayer(){
    return player;
  };
  
  /**
   * gets the player that we are using
   * highlights the position where we click
   * and attempts to move the player to that location
   * @param {int} posX 
   * @param {int} posY 
   */
  function movePlayerTo(posX, posY) {
      // Checks if we are clicking ourselves.
    if(checkValidMoves(posX,posY)){
        const newStep = {step:{x:roundDown(posX/64), y:roundDown(posY/64)}};
        if(g_steps.length > 0 ) {
          const lastStep = g_steps.pop();
          if(lastStep.step.x === newStep.step.x && lastStep.step.y === newStep.step.y){
            g_steps.push(lastStep);
            return;
          } else {
            g_steps.push(lastStep);
          }
        }
        g_sprites.highLight.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
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
  function checkValidMoves(posX, posY){
      let myPlayer = getPlayer();
      let gridPosition = {
        x : roundDown(posX/64),
        y : roundDown(posY/64)
    };
    // Distance between two points.
    let distX = gridPosition.x - myPlayer.entityPos.tileX;
    let distY = gridPosition.y - myPlayer.entityPos.tileY;

    if(distX + distY != 0) return true;
  };
  // Shows for both directions
  // ----------------UNUSED!!!--------------------
  function showValid(dist,posX, posY){
    switch(Math.abs(dist)) {
        case dist = 1:
            g_sprites.validWalk.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
            break;
        case dist = 2:
            g_sprites.invalidWalk.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
            break;
        default:
            
    }
  }