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
    grassTile: './client/img/grassTile.png',
    grassTileHighlight: './client/img/grassTileHighlight.png',
    player: './client/img/Player/player_06.png',
    highLight: './client/img/highLight.png',
    house: './client/img/house.png',
    terrain: './client/img/crate_04.png'
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

  g_sprites.grassTile = new Sprite(g_images.grassTile);
  g_sprites.grassTileHighlight = new Sprite(g_images.grassTileHighlight);
  g_sprites.player = new Sprite(g_images.player);
  g_sprites.highLight = new Sprite(g_images.highLight);
  g_sprites.house = new Sprite(g_images.house);
  g_sprites.terrain = new Sprite(g_images.terrain);
}

// Kick it off
requestPreloads();
// our canvas
/**
 *  Draws our play area
 * @param {Tile} tile 
 * @param {Socket.id} id 
 */
function drawEmptyMapViaTiles(tile, id) {
  clearCanvas(g_ctx);
  if (!(tile.hasOwnProperty("__tiles"))) return null;
  for (let i = 0; i < tile.__tiles.length; i++) {
    for (let j = 0; j < tile.__tiles[i].length; j++) {
      checkTile(tile, i, j);
      g_ctx.rect(i * 64, j * 64, 64, 64);
      g_ctx.stroke();
    }
  }
};
/**
 * Draws the corresponding pixel in accordance to our map made server-side
 * @param {Tile} tile 
 * @param {int} i x-axis 
 * @param {int} j y-axis
 */
function checkTile(tile, i, j) {
  if (tile.__tiles[i][j]._amITerrain) {
    g_sprites.terrain.drawAt(g_ctx, i * 64, j * 64);
  } else if (tile.__tiles[i][j]._amIAStructure) {
    g_sprites.house.drawAt(g_ctx, i * 64, j * 64);
  } else {
    g_sprites.grassTile.drawAt(g_ctx, i * 64, j * 64);
  }
  if (tile.__tiles[i][j]._entities[1]) {
    g_sprites.player.drawAt(g_ctx, i * 64, j * 64);
  }
}
function returnTileAt(posX, posY) {
  g_sprites.highLight.drawAt(g_ctx, convertToMatrix(posX), convertToMatrix(posY));
}

 // draw();
