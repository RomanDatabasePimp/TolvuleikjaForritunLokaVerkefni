/* -------------------------------------------------------------------------------------
   ------------------------------UTILS CODE START---------------------------------------
   -------------------------------------------------------------------------------------*/


function allCharactersRendered(chars) {
  if(!chars.bob) { return false;}
  else if(!chars.sara) { return false;}
  else if(!chars.monster) { return false;}
  else { return true;}
}   

/* utilityFunctions for drawings  */

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
/**
 * rounds down an integer for easier use in our grid. 
 * @param {int} x 
 */
function roundDown(x) {
  return Math.floor(x);
}
/**
 * takes an x or y coord and converts it into a 0-10 double digit
 * Sends that to rounddown to math.floor it, to a 0-10 int digit.
 * Multiplies by 64 for x-y coords for our grid.
 * Useful mostly for mouse inputs in our game.
 * @param {int} x 
 */
function convertToMatrix(x) {
  x = roundDown(x / 64);
  return x * 64;
}
/**
 * Random number from min to max.
 * @param {int} min 
 * @param {int} max 
 */
function randRange(min, max) {
  return (min + Math.random() * (max - min));
}

function wrapRange (value, lowBound, highBound) {
  while (value < lowBound) {
value += (highBound - lowBound);
  }
  while (value > highBound) {
value -= (highBound - lowBound);
  }
  return value;
}

/* Usage : gameOver(whowon)
     For : who won is a string telling who won
    After: calls the nessesary functions to end the game also emits
                after 5 seconds a request to reset the game  */
function gameOver(whowon) {
  /* Helgi ur functions come here */
  victorySound();
  document.getElementById("winnerNoteID").innerHTML = "Congratz " + whowon + " you are victorioues !!!";
  setTimeout(() => { socket.emit('resetgamerequest', null); }, 8000);
}
/* -------------------------------- _________________--------------------------------------
   ------------------------------- | UTILS CODE END  |------------------------------------
   --------------------------------|_________________|------------------------------------*/