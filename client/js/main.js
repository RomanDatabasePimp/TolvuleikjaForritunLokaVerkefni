// =============
// PRELOAD STUFF
// =============


// Kick it off
requestPreloads();
// our canvas
/**
 *  Draws our play area
 * @param {Tile} tile 
 * @param {Socket.id} id 
 */
function drawMapViaTiles(tile) {
  if (!(tile.hasOwnProperty("__tiles"))) return null;
  for (let i = 0; i < tile.__tiles.length; i++) {
    for (let j = 0; j < tile.__tiles[i].length; j++) {
      drawTile(tile.__tiles, i, j);
      try{
        if(g_steps[i].step.x == i && g_steps[i].step.y == j){
         
        }
      } catch(e){}
    }
  }
};
/**
 * Draws the corresponding map sprite in accordance to our map made server-side
 * @param {Tile} tile 
 * @param {int} i x-axis 
 * @param {int} j y-axis
 */
function drawTile(tile, i, j) {
  if (tile[i][j]._amITerrain) {
    g_sprites.terrain.drawAt(g_ctx, i * 64, j * 64);
  } else if (tile[i][j]._amIAStructure) {
    g_sprites.grassTile.drawAt(g_ctx, i * 64, j * 64);
    g_sprites.tallGrass.drawAt(g_ctx, i * 64, j * 64);
  } else {
    g_sprites.grassTile.drawAt(g_ctx, i * 64, j * 64);
  }
  if (treasureExistsInTile(tile[i][j]._entities)) {
    let treasure = treasureExistsInTile(tile[i][j]._entities);
    if (treasure.type == "key") {
      g_sprites.key.drawAt(g_ctx, i * 64, j * 64);
    }
    if (treasure.type == "powerup") {
      g_sprites.powerUp.drawAt(g_ctx, i * 64, j * 64);
    }
  }
};

/**
 * itterate the tiles and find those tiles that contain players 
 * @param {Array[][]} tiles 
 * returns a objects of a form {tile,i,j} 
 */
function fetchPlayerTiles(tiles) {
  let playersInTiles = [];
  for (let i = 0; i < tiles.length; i++) {     // for each of our tile set
    for (let j = 0; j < tiles[i].length; j++) { // for each tile in our tile set
      let player = playerExistsInTile(tiles[i][j]._entities);
      if (player) { // check if the player exists in the tile
        playersInTiles.push({ tile: tiles[i][j], i: i, j: j });
      }
    }
  }
  return playersInTiles;
};

/**
 * Draws the corresponding character sprite in accordance to our map made server-side
 * @param {Tile} tile 
 * @param {int} i x-axis 
 * @param {int} j y-axis
 * @param {int} id id frá player, notað til að identifya players
 * This code is awful and unreadable, I would avoid changing it.
 * It works however.
 * @Author Helgi Grétar Gunnarsson, Hgg26.
 */
function drawCharacters(tile, i, j, id) {
  let tileGrass;
  let entity = playerExistsInTile(tile._entities);
  player = getPlayer();
  if(tile._amIAStructure){
    tileGrass = tile;
  if ((tileGrass._TilePosX && player.entityPos.tileX) && (tileGrass._TilePosY && player.entityPos.tileY)) {
    g_ctx.globalAlpha = 0.8;
    drawCorrectChar(player.character, player.entityPos.tileX, player.entityPos.tileY, true);
    g_ctx.globalAlpha = 1;
    return;
  }
}
  if (playerExistsInTile(tile._entities)) {
    if(tileGrass) return;
    drawCorrectChar(entity.character, i, j, false);
  }
};
/**
 * Draws the correct character at the corresponding location.
 * @param {tile} char 
 * @param {int} i 
 * @param {int} j 
 */
function drawCorrectChar(char, i, j, isHidden) {
  // if our character is hidden, draw it that sprite.
  switch (char) {
    case char = "bob":
      if (isHidden) {
        g_sprites.bobHidden.drawAt(g_ctx, i * 64, j * 64);
      } else {
        g_sprites.player.drawAt(g_ctx, i * 64, j * 64);
      }
      break;
    case char = "sara":
      if (isHidden) {
        g_sprites.saraHidden.drawAt(g_ctx, i * 64, j * 64);
      } else {
        g_sprites.saraPlayer.drawAt(g_ctx, i * 64, j * 64);
      }
      break;
    case char = "monster":
      if (isHidden) {
        g_sprites.monsterHidden.drawAt(g_ctx, i * 64, j * 64);
      } else {
        g_sprites.monster.drawAt(g_ctx, i * 64, j * 64);
      }
      break;
    default:

  }

};
/**
 * finds the entity at our location.
 * @param {Entity} entity 
 */
function findEntity(entity) {
  var foundEnt = entity.find(function (ent) {
    return ent;
  });
  return foundEnt;
};
function treasureExistsInTile(tile) {
  for (let i = 0; i < tile.length; i++) {
    if (tile[i]) {
      if (tile[i].hasOwnProperty("type")) {
        return tile[i];
      }
    }
  }
  return null;
};
function playerExistsInTile(tile) {
  for (let i = 0; i < tile.length; i++) {
    if (tile[i]) {
      if (tile[i].hasOwnProperty("character")) {
        return tile[i];
      }
    }
  }
  return null;
};
