/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE START-----------------------------------
   -------------------------------------------------------------------------------------*/

   var keys = [];
// Togglable Pause Mode
const RESET_KEY = 'R'.charCodeAt(0);
const POWERUP_KEY  = 'X'.charCodeAt(0);
const RDY_KEY = 32;

// Movement
let KEY_UP = 'W'.charCodeAt(0);
let KEY_DOWN  = 'S'.charCodeAt(0);
let KEY_LEFT   = 'A'.charCodeAt(0);
let KEY_RIGHT  = 'D'.charCodeAt(0);

function handleKeydown(evt) {
  keys[evt.keyCode] = true;
  let player = getPlayer();
  if(evt.keyCode === POWERUP_KEY) { g_usedPowerUp = true; }
  if(evt.keyCode === RESET_KEY) { socket.emit('resetgamerequest',null); }
  if(evt.keyCode === RDY_KEY) {
    evt.preventDefault();
    g_readyForNextRound = true;
    socket.emit('clientreadyfornextround',g_readyForNextRound);
  }
  if(eatKey(KEY_UP)){
    if(player.stamina > 0){
      movePlayerTo(player.entityPos.tileX,player.entityPos.tileY - 1);
      player.entityPos.tileY -= 1;
    }
  }
  if(eatKey(KEY_DOWN)){
    if(player.stamina > 0){
    movePlayerTo(player.entityPos.tileX,player.entityPos.tileY + 1);
    player.entityPos.tileY += 1;
    }
  }
  if(eatKey(KEY_LEFT)){
    if(player.stamina > 0){
    movePlayerTo(player.entityPos.tileX - 1 ,player.entityPos.tileY);
    player.entityPos.tileX -= 1;
    }
  }
  if(eatKey(KEY_RIGHT)){
    if(player.stamina > 0){
    movePlayerTo(player.entityPos.tileX + 1,player.entityPos.tileY);
    player.entityPos.tileX += 1;
    }
  }//player.entityPos.tileX

}

function handleKeyup(evt) {
  keys[evt.keyCode] = false;
}

function eatKey(keyCode) {
  var isDown = keys[keyCode];
  keys[keyCode] = false;
  return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
  return keyChar.charCodeAt(0);
}

window.addEventListener("keydown", handleKeydown);
window.addEventListener("keyup", handleKeyup);
// add the listeners to the window so the use can press these guys

/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE END-------------------------------------
   -------------------------------------------------------------------------------------*/