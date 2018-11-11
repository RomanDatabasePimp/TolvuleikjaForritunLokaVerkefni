player = getPlayer();
let i =0;
let pos =0;
let id;
var carImg = new Image();

function moveMen(){
    console.log("komast inn")
    pos= 0;
    id = setInterval(frame, 20);
  }
function frame() {
    if (pos == 300) {
    clearInterval(id);
    } else {
        // hér þarf að gera animation frá punkt a til punkt b
        try{
            g_sprites.rightWalk2.drawAt(g_ctx, player.movement[0].step.x,player.movement[0].step.y);
        }catch{
            
        }
    pos++; 
    console.log(pos);
    }
}