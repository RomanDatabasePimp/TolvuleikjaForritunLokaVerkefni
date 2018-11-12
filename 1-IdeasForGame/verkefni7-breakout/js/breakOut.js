/* -------------------------------------------------------------------------------------
   ------------------------------GAME CODE START---------------------------------------
   -------------------------------------------------------------------------------------*/

   /* breakOut.js is responsible for taking all the the other objects and combingin them
      together to create the sexiest of the game  */
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */
const g_canvas = document.getElementById("myCanvas");
const g_ctx = g_canvas.getContext("2d");

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

/* ---------------------------------------------------------
   -------------------Update Simulation---------------------
   ---------------------------------------------------------*/

// We take a very layered approach here...
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
// It then delegates the game-specific logic to `updateSimulation`
// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
  bricksUpdate(du);
  powerupUpdates(du);
  g_ball.update(du);
  if(g_p2Enable){g_ball2.update(du);}
  g_paddle1.update(du);
  if(g_p2Enable){g_paddle2.update(du);}
}

/* ---------------------------------------------------------
   -------------------Update Simulation---------------------
   ---------------------------------------------------------*/

// We take a very layered approach here...
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
// It then delegates the game-specific logic to `gameRender`
// GAME-SPECIFIC RENDERING
function renderSimulation(ctx) {
  bricksRender(ctx);
  powerRender(ctx);
  g_ball.render(ctx);
  if(g_p2Enable){g_ball2.render(ctx);}
  /* for some reason in the first render the g_player1Sprite is not loaded
     eventhough it is forced in the preloader talked to t.a about this
     we thought it was wierd  */
  //if(!g_player1Sprite){ return; }
  g_paddle1.render(ctx);
  if(g_p2Enable){g_paddle2.render(ctx);}
}

// Kick it off
g_main.init();