/* -------------------------------------------------------------------------------------
   ------------------------------UTILS CODE START---------------------------------------
   -------------------------------------------------------------------------------------*/

/* utilityFunctions for drawings  */

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function roundDown(x){
  return Math.floor(x);
}
/**
 * takes an x or y coord and converts it into a 0-10 double digit
 * Sends that to rounddown to math.floor it, to a 0-10 int digit.
 * Multiplies by 64 for x-y coords for our grid.
 * @param {*} x 
 */
function convertToMatrix(x){
  x = roundDown(x/64);
  return x*64;
}
/* -------------------------------------------------------------------------------------
   ------------------------------UTILS CODE END-----------------------------------------
   -------------------------------------------------------------------------------------*/