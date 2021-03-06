/* This is a sexy, fade out text that will be displayed when a user signals 
   when he is ready for the next round  */

// A generic contructor which accepts an arbitrary descriptor object
function FadeOutText(descr) {
  /* For now we want to recive textToFadeOut="xxxx" */
  for(let property in descr) { this[property] = descr[property]; }
}


FadeOutText.prototype.lifeSpan = 3000 / 70;

FadeOutText.prototype.giveMeLife = function() {
  this.lifeSpan = 3000/70;
}

FadeOutText.prototype.update = function (du,gameReady) {

  // if the game is not ready we return
  if(!gameReady){ return; }
  if (this.lifeSpan < 0) return;
  this.lifeSpan -= du;
};

FadeOutText.prototype.render = function (gameReady) {

  if (this.lifeSpan < 0) return;
  
  if(gameReady){ return;}

  // let fadeThresh = FadeOutText.prototype.lifeSpan / 3;
  // if (this.lifeSpan < fadeThresh) { ctx.globalAlpha = this.lifeSpan / fadeThresh; }
  
  
  ctx.font = "bold 40px Arial";
  ctx.fillText(this.textToFadeOut,10,320);
  
 // ctx.globalAlpha = 1;
};

const g_FadeOutTexts = {
  waitingText : new FadeOutText({textToFadeOut:"Press Space to start next Round"})
};