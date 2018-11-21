/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE START-----------------------------------
   -------------------------------------------------------------------------------------*/

var keys = [];
// Togglable Pause Mode
const RESET_KEY = 'R'.charCodeAt(0);
const POWERUP_KEY = 'X'.charCodeAt(0);
const RDY_KEY = 32;

// Movement
let KEY_UP = 'W'.charCodeAt(0);
let KEY_DOWN = 'S'.charCodeAt(0);
let KEY_LEFT = 'A'.charCodeAt(0);
let KEY_RIGHT = 'D'.charCodeAt(0);
let KEY_MUSIC = 'M'.charCodeAt(0);
// GlobalVarable
let musicPlay = false;
function startGame(evt){
  keys[evt.keyCode] = true;
  if (evt.keyCode === POWERUP_KEY) { 
    g_usedPowerUp = true;
  }
  if(eatKey(KEY_MUSIC)){
    musicPlay = !musicPlay;
    if(musicPlay){
      backgroundMusic.play();
    }else{
      backgroundMusic.pause();
    }
  }
  if (evt.keyCode === RESET_KEY) {
    amIalive = true;
    socket.emit('resetgamerequest', null);
  }
  if (evt.keyCode === RDY_KEY ) {
    evt.preventDefault();
    g_readyForNextRound = true;
    //g_FadeOutTexts.waitingText.giveMeLife();
    // koma í veg fyrir að gaming animation mun gitcha
    socket.emit('clientreadyfornextround', g_readyForNextRound);
  }
}


function handleKeydown(evt) {
  keys[evt.keyCode] = true;
  if (eatKey(KEY_UP)) {
    if(player.entityPos.posY - 1 < 0) return;
      movePlayerTo(player.entityPos.tileX, player.entityPos.tileY - 1);
      player.entityPos.tileY -= 1;
  }
  if (eatKey(KEY_DOWN)) {
    if(player.entityPos.posY + 1 > 9) return;
      movePlayerTo(player.entityPos.tileX, player.entityPos.tileY + 1);
      player.entityPos.tileY += 1;
  }
  if (eatKey(KEY_LEFT)) {
    if(player.entityPos.posX - 1 < 0) return;
      movePlayerTo(player.entityPos.tileX - 1, player.entityPos.tileY);
      player.entityPos.tileX -= 1;
  }
  if (eatKey(KEY_RIGHT)) {
    if(player.entityPos.posX + 1 > 9) return;
      movePlayerTo(player.entityPos.tileX + 1, player.entityPos.tileY);
      player.entityPos.tileX += 1;
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


// add the listeners to the window so the use can press these guys

/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE END-------------------------------------
   -------------------------------------------------------------------------------------*/