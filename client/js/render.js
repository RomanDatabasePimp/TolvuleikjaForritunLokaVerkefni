/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* this is the class where all the rendering for the client  happens  */

var g_frameCounter = 1;

/* Usage : render(ctx)
For  : ctx is the drawing context
After : draws out the currents state of the map */
function render(ctx) {
  // always start to clear the canvas duh ! we got no pause fetures cuz this be online!
  clearCanvas(ctx);
  // if the game state has tiles we know it has game state to render
  if(g_gamestate.hasOwnProperty("__tiles")) {
    gamePlaying();
    /* rafnar draws his map and the map objects keys,redbull etc..  */
    drawMapViaTiles(g_gamestate, sockid);

    /* if the round hasent started we draw the fade out text */
    g_FadeOutTexts.waitingText.render(g_readyForNextRound);

    /* helgi draws his character animations */
    g_animations["bob"].render(ctx);
    g_animations["sara"].render(ctx);
    g_animations["monster"].render(ctx);

    /* when animations are done rafnar draws the static images of the characters */
    if(g_animation_finished) {
      g_tilesContainingPlayers.map(char => { drawCharacters(char.tile,char.i,char.j,sockid);  });
    }

    
    g_steps.map(step => { g_sprites.highLight.drawAt(g_ctx,step.step.x*64, step.step.y*64); });

    /*  draw the client side cloud to fuck with the clients */
    for( let cloud in g_clouds) { g_clouds[cloud].render(ctx); }
    
    return;
  }
  
  // if we ever reach this part of code that means we are in the waiting lobby
  // helgis functions come here 
  allPlayerWaiting(g_waiting,true);


}