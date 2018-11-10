  
  // our canvas
  const g_canvas = document.getElementById("myCanvas");
  const g_ctx = g_canvas.getContext("2d");

  function draw() {
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
    img.src = './client/img/grassTile.png';
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
