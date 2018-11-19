/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE START-----------------------------------
   -------------------------------------------------------------------------------------*/

// Togglable Pause Mode
const RESET_KEY = 'R'.charCodeAt(0);
const POWERUP_KEY  = 'X'.charCodeAt(0);
const RDY_KEY = 32;



function handleKeydown(evt) {
  if(evt.keyCode === POWERUP_KEY) { g_usedPowerUp = true; }
  if(evt.keyCode === RESET_KEY) { socket.emit('resetgamerequest',null); }
  if(evt.keyCode === RDY_KEY) {
    evt.preventDefault();
    g_readyForNextRound = true;
    g_FadeOutTexts.waitingText.giveMeLife();
    socket.emit('clientreadyfornextround',g_readyForNextRound);
  }
}

// add the listeners to the window so the use can press these guys

/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE END-------------------------------------
   -------------------------------------------------------------------------------------*/