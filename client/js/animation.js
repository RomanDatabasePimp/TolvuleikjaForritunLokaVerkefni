function playerAnimation (){
    this.pos = 0,
    this.id = null,
    this.count =0,
    this.oldX = 0,
    this.oldY =0,
    this.path = "stay",
    this.noDraw = false,
    this.img1 = null,
    this.img1 = null,
    this.howManyTime = 0
};
playerAnimation.prototype.moveMen = function(){
    document.getElementById("winnerNoteID").style.display = 'none';
    
};
playerAnimation.prototype.frame =function(du) {
    if (this.howManyTime >= 166) {
        try{       
            this.howManyTime = 0;
            count =0;
            path="";
            noDraw = false;      
            player.movement = player.movement.slice(1);
        }catch{
            console.log("catch villa í animation js");
        }
    } else {
        this.howManyTime+= du;
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
            count += 16.666;
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
                    img1 =  g_sprites.bobDown1;
                    img2 =  g_sprites.bobDown2;
                  break;
                case path = "up":
                    playerX = player.movement[0].step.x*64;
                    playerY = player.movement[0].step.y*64-count;
                    img1 =  g_sprites.bobUp1;
                    img2 =  g_sprites.bobUp2;
                break;
                case path = "stay":
                    noDraw = true;
                break;
                default:
            }
            if(noDraw == false){
                if(pos%2 == 0 ){
                    img1.drawAt(g_ctx, playerX,playerY);
                }if(pos %3 == 0){
                    img2.drawAt(g_ctx, playerX,playerY);
                }
                
            }
        }catch(e){
            console.log(e);
        }
    pos++; 
    }
};

playerAnimation.prototype.checkWichDirection = function(){
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
};
