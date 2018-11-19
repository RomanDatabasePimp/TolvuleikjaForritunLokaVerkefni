function playerAnimation (descr){
    for(let property in descr) {
        this[property] = descr[property];
      }
      
    this.pos = 0,
    this.id = null,
    this.count =0,
    this.oldX = 0,
    this.oldY =0,
    this.path = "stay",
    this.noDraw = false,
    this.img1 = null,
    this.img1 = null,
    this.howManyTime = 0,
    this.movement = []
};
playerAnimation.prototype.setmovement = function(moves){
  this.movement = moves;
};

playerAnimation.prototype.moveMen = function(){
    document.getElementById("winnerNoteID").style.display = 'none';
    
};
playerAnimation.prototype.frame = function(du) {
<<<<<<< Updated upstream
    if (this.howManyTime >= 166 || this.movement.length >= 0) {
=======
    if (this.howManyTime >= 166 || this.movement.length == 0) {
>>>>>>> Stashed changes
        try{
            this.howManyTime = 0;
            pos =0;
            count =0;
            path="";
            noDraw = false;
            this.movement.slice(0,1);
            this.moveMen[0].step.x;
        }catch{
            if(this.name === "bob") {
                g_walkinganimfinish.bob = true;
            }
            if(this.name === "sara") {
                g_walkinganimfinish.sara = true;
            }
            if(this.name === "monster") {
                g_walkinganimfinish.monster = true;
            }
            console.log("catch villa í animation js");
            return;
        }
    } else {
        this.howManyTime+= du;
        // hér þarf að gera animation frá punkt a til punkt b
            this.oldX = this.movement[0].step.x;
            this.oldy = this.movement[0].step.y
            checkWichDirection(this.movement[1].step.x, this.movement[1].step.y);

     
            
        try{
            // Hér þarf að determa í hvaða átt
            count += 16.666;
            switch (path) {
                case path = "left":
                    playerX = this.movement[0].step.x*64-count;
                    playerY = this.movement[0].step.y*64;
                    img1 =  g_sprites.bobLeft1;
                    img2 =  g_sprites.bobLeft2;
                  break;
                case path = "right":
                    playerX = this.movement[0].step.x*64+count;
                    playerY = this.movement[0].step.y*64;
                    img1 =  g_sprites.bobRight1;
                    img2 =  g_sprites.bobRight2;
            
                  break;
                case path = "down":
                    playerX = this.movement[0].step.x*64;
                    playerY = this.movement[0].step.y*64+count;
                    img1 =  g_sprites.bobDown1;
                    img2 =  g_sprites.bobDown2;
                  break;
                case path = "up":
                    playerX = this.movement[0].step.x*64;
                    playerY = this.movement[0].step.y*64-count;
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
let g_animations = { 
  bob : new playerAnimation({name :"bob"}),
  sara : new playerAnimation({name :"sara"}),
  monster : new playerAnimation({name :"monster"})
}