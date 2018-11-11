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
    terrain: './client/img/crate_04.png',
    validWalk: './client/img/environment_10.png',
    invalidWalk: './client/img/environment_05.png',
    saraPlayer: './client/img/Player/sara_player.png',
    monster: './client/img/Player/monster.png',
    rightWalk1:'./client/img/Player/player_17.png',
    rightWalk2:'./client/img/Player/player_18.png',
    rightWalk3:'./client/img/Player/player_19.png'
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
  g_sprites.validWalk = new Sprite(g_images.validWalk);
  g_sprites.invalidWalk = new Sprite(g_images.invalidWalk);
  g_sprites.saraPlayer = new Sprite(g_images.saraPlayer);
  g_sprites.monster = new Sprite(g_images.monster);
  g_sprites.rightWalk1 = new Sprite(g_images.rightWalk1);
  g_sprites.rightWalk2 = new Sprite(g_images.rightWalk2);
  g_sprites.rightWalk3 = new Sprite(g_images.rightWalk3);

}

// Kick it off
requestPreloads();
// our canvas
/**
 *  Draws our play area
 * @param {Tile} tile 
 * @param {Socket.id} id 
 */
function drawMapViaTiles(tile, id) {
  clearCanvas(g_ctx);
  if (!(tile.hasOwnProperty("__tiles"))) return null;
  for (let i = 0; i < tile.__tiles.length; i++) {
    for (let j = 0; j < tile.__tiles[i].length; j++) {
      checkTile(tile.__tiles,i,j,id);
      g_ctx.rect(i * 64, j * 64, 64, 64);
      g_ctx.stroke();
    }
  }
  g_readyForNextRound = true;
};
/**
 * Draws the corresponding pixel in accordance to our map made server-side
 * @param {Tile} tile 
 * @param {int} i x-axis 
 * @param {int} j y-axis
 */
function checkTile(tile, i, j,id) {
  if (tile[i][j]._amITerrain) {
    g_sprites.terrain.drawAt(g_ctx, i * 64, j * 64);
  } else if (tile[i][j]._amIAStructure) {
    g_sprites.house.drawAt(g_ctx, i * 64, j * 64);
  } else {
    g_sprites.grassTile.drawAt(g_ctx, i * 64, j * 64);
  }
  if (tile[i][j]._entities[1]) {
    drawCorrectChar(tile[i][j]._entities[1].character, i, j);
    checkPlayer(tile[i][j]._entities[1], id);
  }
};

function drawCorrectChar(char, i, j){
  switch(char) {
    case char = "bob":
         g_sprites.player.drawAt(g_ctx, i * 64, j * 64);
        break;
    case char = "sara":
      g_sprites.saraPlayer.drawAt(g_ctx, i * 64, j * 64);
        break;
    case char = "monster":
      g_sprites.monster.drawAt(g_ctx, i * 64, j * 64);
      break;
    default:
        
}

}
 
