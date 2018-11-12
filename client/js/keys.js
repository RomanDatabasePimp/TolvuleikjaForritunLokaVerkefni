/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE START-----------------------------------
   -------------------------------------------------------------------------------------*/

// Togglable Pause Mode
const RESET_KEY = 'R'.charCodeAt(0);
const POWERUP_KEY  = 'X'.charCodeAt(0);



function handleKeydown(evt) {
  if(evt.keyCode === POWERUP_KEY) { g_usedPowerUp = true; }
  if(evt.keyCode === RESET_KEY) { socket.emit('resetgamerequest',null); } 
}

// add the listeners to the window so the use can press these guys

/* -------------------------------------------------------------------------------------
   ------------------------------KEY STUFF CODE END-------------------------------------
   -------------------------------------------------------------------------------------*/