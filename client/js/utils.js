/* -------------------------------------------------------------------------------------
   ------------------------------UTILS CODE START---------------------------------------
   -------------------------------------------------------------------------------------*/

/* utilityFunctions for drawings  */

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function roundDown(x) {
  return Math.floor(x);
}
/**
 * takes an x or y coord and converts it into a 0-10 double digit
 * Sends that to rounddown to math.floor it, to a 0-10 int digit.
 * Multiplies by 64 for x-y coords for our grid.
 * @param {*} x 
 */
function convertToMatrix(x) {
  x = roundDown(x / 64);
  return x * 64;
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