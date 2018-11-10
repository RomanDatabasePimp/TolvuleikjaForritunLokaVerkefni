// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
        grassTile   : './client/img/grassTile.png',
        grassTileHighlight  : './client/img/grassTileHighlight.png',
        player_01   : './client/img/Player/player_01.png'
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.grassTile  = new Sprite(g_images.grassTile);
    g_sprites.grassTileHighlight = new Sprite(g_images.grassTileHighlight);
    g_sprites.player_01  = new Sprite(g_images.player_01);

    drawEmptyMap();
    
}

// Kick it off
requestPreloads();
  // our canvas
  function drawEmptyMap() {
    for (let i = 0; i <= 640; i += 64) {
      for (let j = 0; j <= 640; j += 64) {
        g_sprites.grassTile.drawAt(g_ctx,i,j);
      }
    }
  };

  function drawHighlight() {
    var img = new Image();
    img.onload = function () {
      for (let i = 0; i <= 640; i += 64) {
        for (let j = 0; j <= 640; j += 64) {
          g_ctx.drawImage(img, i, j);
        }
      }
      g_ctx.beginPath();
      g_ctx.stroke();
    };
    img.src = './client/img/grassTileHighlight.png';
  };
  function drawPlayer(posX,posY) {
    var img = new Image();
    img.onload = function () {
      g_ctx.drawImage(img, posX, posY);
      g_ctx.beginPath();
      g_ctx.stroke();
    };
    img.src = './client/img/Player/player_01.png';
  };

 // draw();
