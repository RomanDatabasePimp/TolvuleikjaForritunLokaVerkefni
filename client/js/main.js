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
    player: './client/img/Player/player_06.png',
    highLight: './client/img/highLight.png',
    house: './client/img/house.png',
    terrain: './client/img/crate_04.png',
    key: './client/img/keys/platformPack_item014.png',
    powerUp: './client/img/keys/platformPack_item003.png',
    tallGrass: './client/img/tallGrass_tile.png',
    //Sara
    saraPlayer: './client/img/Player/sara_player.png',
    saraHidden: './client/img/Player/sara_hidden.png',
    saraLeft1: './client/img/Player/sara_20.png',
    saraLeft2: './client/img/Player/sara_21.png',
    saraRight1: './client/img/Player/sara_17.png',
    saraRight2: './client/img/Player/sara_18.png',
    saraDown1: './client/img/Player/sara_06.png',
    saraDown2: './client/img/Player/sara_07.png',
    saraUp1: './client/img/Player/sara_08.png',
    saraUp2: './client/img/Player/sara_09.png',
    //Monster
    monster: './client/img/Monster/platformChar_idle.png',
    monsterHidden: './client/img/Monster/monster_hidden.png',
    monsterClimb1: './client/img/Monster/platformChar_climb1.png',
    monsterClimb2: './client/img/Monster/platformChar_climb2.png',
    monsterDuck: './client/img/Monster/platformChar_duck.png',
    monsterHappy: './client/img/Monster/platformChar_happy.png',
    monsterWalk1: './client/img/Monster/platformChar_walk1.png',
    monsterWalk2: './client/img/Monster/platformChar_walk2.png',
    //Bob
    bobRight1: './client/img/Player/player_17.png',
    bobHidden: './client/img/Player/bob_hidden.png',
    bobRight2: './client/img/Player/player_18.png',
    bobLeft1: './client/img/Player/player_20.png',
    bobLeft2: './client/img/Player/player_21.png',
    //Sama mynd og player
    bobDown1: './client/img/Player/player_06.png',
    bobDown2: './client/img/Player/player_07.png',
    bobUp1: './client/img/Player/player_08.png',
    bobUp2: './client/img/Player/player_09.png',
    cloud: './client/img/gay_ass_cloud.png'
  };

  imagesPreload(requiredImages, g_images, preloadDone);
  mainInit();
}

var g_sprites = {};
/**
 * Once finished, add the sprite as a new object of the g_sprites.
 * Called via g_sprites.sprite
 * kicks off by drawing an empty
 */
function preloadDone() {

  g_sprites.grassTile = new Sprite(g_images.grassTile);
  g_sprites.tallGrass = new Sprite(g_images.tallGrass);
  g_sprites.player = new Sprite(g_images.player);
  g_sprites.highLight = new Sprite(g_images.highLight);
  g_sprites.house = new Sprite(g_images.house);
  g_sprites.terrain = new Sprite(g_images.terrain);
  g_sprites.key = new Sprite(g_images.key);
  g_sprites.powerUp = new Sprite(g_images.powerUp);
  //----------Sara--------------//
  g_sprites.saraPlayer = new Sprite(g_images.saraPlayer);
  g_sprites.saraHidden = new Sprite(g_images.saraHidden);
  g_sprites.saraDown1 = new Sprite(g_images.saraDown1);
  g_sprites.saraDown2 = new Sprite(g_images.saraDown2);
  g_sprites.saraLeft1 = new Sprite(g_images.saraLeft1);
  g_sprites.saraLeft2 = new Sprite(g_images.saraLeft2);
  g_sprites.saraUp1 = new Sprite(g_images.saraUp1);
  g_sprites.saraUp2 = new Sprite(g_images.saraUp2);
  //---------Monster------------//
  g_sprites.monster = new Sprite(g_images.monster);
  g_sprites.monsterHidden = new Sprite(g_images.monsterHidden);
  g_sprites.monsterClimb1 = new Sprite(g_images.monsterClimb1);
  g_sprites.monsterClimb2 = new Sprite(g_images.monsterClimb2);
  g_sprites.monsterDuck = new Sprite(g_images.monsterDuck);
  g_sprites.monsterHappy = new Sprite(g_images.monsterHappy);
  g_sprites.monsterWalk1 = new Sprite(g_images.monsterWalk1);
  g_sprites.monsterWalk2 = new Sprite(g_images.monsterWalk2);
  //---------Bob----------------//
  g_sprites.bobRight1 = new Sprite(g_images.bobRight1);
  g_sprites.bobHidden = new Sprite(g_images.bobHidden);
  g_sprites.bobRight2 = new Sprite(g_images.bobRight2);
  g_sprites.bobLeft1 = new Sprite(g_images.bobLeft1);
  g_sprites.bobLeft2 = new Sprite(g_images.bobLeft2);
  g_sprites.bobDown1 = new Sprite(g_images.bobDown1);
  g_sprites.bobDown2 = new Sprite(g_images.bobDown2);
  g_sprites.bobUp1 = new Sprite(g_images.bobUp1);
  g_sprites.bobUp2 = new Sprite(g_images.bobUp2);
  g_sprites.cloud = new Sprite(g_images.cloud);
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
  if (!(tile.hasOwnProperty("__tiles"))) return null;
  for (let i = 0; i < tile.__tiles.length; i++) {
    for (let j = 0; j < tile.__tiles[i].length; j++) {
      drawTile(tile.__tiles, i, j);
      // drawCharacters(tile.__tiles, i, j, id); <-- CHANGE THIS
    }
  }
  g_readyForNextRound = true;
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
    if(treasure.type == "key"){
      g_sprites.key.drawAt(g_ctx, i * 64, j * 64);
    }
    if(treasure.type == "powerUp"){
      g_sprites.powerUp.drawAt(g_ctx, i * 64, j * 64);
    }
  };

  /**
   * Draws the corresponding character sprite in accordance to our map made server-side
   * @param {Tile} tile 
   * @param {int} i x-axis 
   * @param {int} j y-axis
   * @param {int} id id frá player, notað til að identifya players
   */
  function drawCharacters(tile, i, j, id) {
    if (tile[i][j]._amIAStructure && playerExistsInTile(tile[i][j]._entities)) {
      let entity = playerExistsInTile(tile[i][j]._entities);
      checkPlayer(entity, id);
      player = getPlayer();
      g_ctx.globalAlpha = 0.5;
      drawCorrectChar(player.character, player.entityPos.tileX, player.entityPos.tileY, true);
      g_ctx.globalAlpha = 1;
      return;
    }
    if (playerExistsInTile(tile[i][j]._entities)) {
      let entity = playerExistsInTile(tile[i][j]._entities);
      drawCorrectChar(entity.character, i, j, false);
      checkPlayer(entity, id);
    }
  }
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

  }
  /**
   * finds the entity at our location.
   * @param {Entity} entity 
   */
  function findEntity(entity) {
    var foundEnt = entity.find(function (ent) {
      return ent;
    });
    return foundEnt;
  }
  function treasureExistsInTile(tile) {
    for (let i = 0; i < tile.length; i++) {
      if (tile[i]) {
        if (tile[i].hasOwnProperty("type")) {
          return tile[i];
        }
      }
    }
  }
  return null;
}
function playerExistsInTile(tile) {
  for (let i = 0; i < tile.length; i++) {
    if (tile[i]) {
      if (tile[i].hasOwnProperty("character")) {
        return tile[i];
      }
    }
  }
  return null;
}