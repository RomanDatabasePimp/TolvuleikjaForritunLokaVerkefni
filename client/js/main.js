// =============
// PRELOAD STUFF
// =============

var g_images = {};
/**
 * Request preloads can be used to preload images, add all images to their correct file (client/img/*)
 * then link the file here and add the name of the sprite.
 */
function requestPreloads() {

    var requiredImages = {
        grassTile   : './client/img/grassTile.png',
        grassTileHighlight  : './client/img/grassTileHighlight.png',
        player   : './client/img/Player/player_01.png'
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};
/**
 * Once finished, add the sprite as a new object of the g_sprites.
 * Called via g_sprites.sprite
 * kicks off by drawing an empty
 */
function preloadDone() {

    g_sprites.grassTile  = new Sprite(g_images.grassTile);
    g_sprites.grassTileHighlight = new Sprite(g_images.grassTileHighlight);
    g_sprites.player  = new Sprite(g_images.player);    
}

// Kick it off
requestPreloads();
  // our canvas
/**
 *  Draws our play area, grasstile I axis must be multiplied by 63, not 64
 * @param {Tile} tile 
 * @param {Socket.id} id 
 */
  function drawEmptyMapViaTiles(tile,id) {
    for(let i = 0; i < tile.__tiles.length;i++){
      for(let j = 0; j < tile.__tiles[i].length; j++){
        g_sprites.grassTile.drawAt(g_ctx, i*63,j*64);
        g_ctx.rect(i*63, j*64, 64, 64);
        g_ctx.stroke();
      }
      
    }
  };

 function returnTileAt(posX, posY){
  // This is our valid play area, outside of -28 and 610, we don't want to do anything. 
  if((posX > -28 && posX < 610) && (posY > -28 && posX < 610)){
      console.log("valid play area");
   }
   
 }

 // draw();
