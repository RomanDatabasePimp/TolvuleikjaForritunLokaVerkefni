player = getPlayer();
let i =0;
let pos =0;
let id;
var carImg = new Image();
let count = 0;
let oldX =0;
let oldY=0;
let path = "stay"
let noDraw = false;
let img1;
let img2;


function moveMen(){
        id = setInterval(frame, 10);
  }
function frame() {
    if (pos == 200) {
        try{
            clearInterval(id);           
            pos = 0;
            count =0;
            console.log(player.movement);
            path="";
            noDraw = false;      
            player.movement = player.movement.slice(1);
        }catch{
        }
    } else {
        // hér þarf að gera animation frá punkt a til punkt b
        
            if(player.movement[0] && player.movement[1]){
                oldX =  player.movement[0].step.x;
                oldY =  player.movement[0].step.y;
                checkWichDirection(player.movement[1].step.x, player.movement[1].step.y);
            }else{
                return;
            }   
        try{
            // Hér þarf að determa í hvaða átt
            count += 0.32;
            switch (path) {
                case path = "left":
                    playerX = player.movement[0].step.x*64-count;
                    playerY = player.movement[0].step.y*64;
                    img1 =  g_sprites.bobLeft1;
                    img2 =  g_sprites.bobLeft2;
                  break;
                case path = "right":
                    playerX = player.movement[0].step.x*64+count;
                    playerY = player.movement[0].step.y*64;
                    img1 =  g_sprites.bobRight1;
                    img2 =  g_sprites.bobRight2;
            
                  break;
                case path = "down":
                    playerX = player.movement[0].step.x*64;
                    playerY = player.movement[0].step.y*64+count;
                    img1 =  g_sprites.bobLeft1;
                    img2 =  g_sprites.player;
                  break;
                case path = "up":
                    playerX = player.movement[0].step.x*64;
                    playerY = player.movement[0].step.y*64-count;
                    img1 =  g_sprites.bobRight1;
                    img2 =  g_sprites.player;
                break;
                case path = "stay":
                    noDraw = true;
                break;
                default:
            }
            if(noDraw == false){
                if(pos%2 == 0 || pos %3 == 0 || pos%4 == 0 || pos %5 ==0){
                    img1.drawAt(g_ctx, playerX,playerY);
                }else{
                    img2.drawAt(g_ctx, playerX,playerY);
                }
                
            }
        }catch(e){
            console.log(e);
        }
    pos++; 
    }
}
function checkWichDirection(newx,newy){
    if(oldX < newx){
        path = "right";
        return;
    }
    if(oldX > newx){
        path = "left";
        return;
    }
    if(oldY < newy){
        path="down";
        return;
    }
    if(oldY > newy){
        path ="up";
        return;
    }
    else{
        path="stay;"
        return;
    }
}