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
    let myPlayer = getPlayer();
    g_sprites.highLight.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
    g_steps.push({step:{x:roundDown(posX/64), y:roundDown(posY/64)}});
  };


  
/**
 * TODO COMMENT THSI RAFNAR
 * @param {*} posX 
 * @param {*} posY 
 */
  function showPlayerMoves(posX, posY){
      let myPlayer = getPlayer();
      let gridPosition = {
        x : roundDown(posX/64),
        y : roundDown(posY/64)
    };
    let distX = gridPosition.x - myPlayer.entityPos.tileX;
    let distY = gridPosition.y - myPlayer.entityPos.tileY;
    showValid(distX, posX, posY);
    showValid(distY, posX, posY);
    
  };
  // Shows for both directions
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