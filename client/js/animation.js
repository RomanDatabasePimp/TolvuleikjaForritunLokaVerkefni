function playerAnimation (descr){
    for(let property in descr) {
        this[property] = descr[property];
      }
    /*   
      this.imgUp1 :  g_sprites,
      this.imgUp2 : g_sprites,
      this.imgDown1 : g_sprites,
      this.imgDown2 : g_sprites,
      this.imgRight1: g_sprites,
      this.imgRight2: g_sprites,
      this.imgLeft1: g_sprites,
      this.imgLeft2 : g_sprites  
*/
    this.count = 0,//delete ater fix
    
    this.path = "stay",
    this.noDraw = false,
    this.howManyTime = 0,// to high nr needs to be lowerd but is okay

    this.movement = [],// should be passed in the object
    this.rendersteps = { leftstep : null, rightstep: null , cx:null , cy:null , steppingl : true, descordX:null,descordY:null}
    this.tempMove = [];
};

playerAnimation.prototype.setMovement = function (moves) {
    if(this.movement.length == 0) {
        this.movement = moves;
    } else {
        this.tempMove = moves;
    }

};

playerAnimation.prototype.update= function(du) {
    if(this.movement.length == 0) {
        if(this.tempMove.length > 0) {
            this.movement = this.tempMove;
            this.tempMove = [];
        }
        else {
        g_walkinganimfinish[this.name] = true;
        this.leftstep = null;
        return;
    }
    }
try{
    if(!this.rendersteps.leftstep){
       const newStep = this.movement.shift();
       this.rendersteps.descordX = (this.movement[0].step.x * 64);
       this.rendersteps.descordY = (this.movement[0].step.y * 64);
       this.rendersteps.cx = newStep.step.x*64;
       this.rendersteps.cy = newStep.step.y*64;
       this.checkWichDirection(this.rendersteps.descordX, this.rendersteps.descordY,this.rendersteps.cx, this.rendersteps.cy);
       this.count = 0;
    }
 
    switch (this.path) {
        case this.path = "left":
            this.rendersteps.cx -= 3*du;
            break;
        case this.path = "right":
            this.rendersteps.cx += 3*du;
            break;
        case this.path = "down":
            this.rendersteps.cy += 3*du;
            break;
        case this.path = "up":
            this.rendersteps.cy -= 3*du;
            break;   
        default:
    }
    let tempX = Math.abs(this.rendersteps.cx - this.rendersteps.descordX);
    let tempY = Math.abs(this.rendersteps.cy - this.rendersteps.descordY);
    if(tempX <= 5 && tempY <= 5){
        this.rendersteps.leftstep = null;
        return;
    }
    g_walkinganimfinish[this.name] = false;
    this.rendersteps.steppingl = !this.rendersteps.steppingl;

}catch{
    // villa
}
};

playerAnimation.prototype.moveMen = function(){
    document.getElementById("winnerNoteID").style.display = 'none';
    
};
playerAnimation.prototype.render = function(g_ctx,map) { 
    if(map){
      let xp = roundDown(this.rendersteps.cx/64);
      let yp = roundDown(this.rendersteps.cy/64);
      if(map.__tiles[xp][yp]._amIAStructure && !(player.character === this.name)){  
        return;
      }
    }
    if(this.movement.length == 0) { return; }
    this.count += 1;
    try{
            if(this.count %2 == 0 && this.count%3 == 0) {
              this.rendersteps.leftstep.drawAt(g_ctx,this.rendersteps.cx,this.rendersteps.cy);  
            } else{
                this.rendersteps.rightstep.drawAt(g_ctx,this.rendersteps.cx,this.rendersteps.cy);  
            }
    }catch{

    }
};
playerAnimation.prototype.clearTemp = function(){
    this.movement = [];
    this.tempMove = [];
};
    playerAnimation.prototype.checkWichDirection = function(newx,newy,oldX,oldY){
        if(this.name == "bob"){
            if(oldX < newx){
                //console.log(this.imgRight1);
                this.rendersteps.leftstep =  g_sprites.bobRight1;
                this.rendersteps.rightstep = g_sprites.bobRight2;
                this.path = "right";
                return;
            }
            if(oldX > newx){
                this.rendersteps.leftstep = g_sprites.bobLeft1;
                this.rendersteps.rightstep =g_sprites.bobLeft2;
                this.path ="left";
                return;
            }
            if(oldY < newy){
                //console.log("niður", this.rendersteps.leftstep);
                this.rendersteps.leftstep =  g_sprites.bobDown1;
                this.rendersteps.rightstep =g_sprites.bobDown2;
            this.path = "down";
            return;
        }
        if(oldY > newy){
            this.rendersteps.leftstep =  g_sprites.bobUp1;
            this.rendersteps.rightstep = g_sprites.bobUp2;
            this.path ="up";
            return;
        }
        else{
            //console.log("viljum ekki sjá STAY");
            this.path="stay;"
            return;
        }
        }
        if(this.name == "sara"){
            if(oldX < newx){
                //console.log(this.imgRight1);
                this.rendersteps.leftstep =  g_sprites.saraRight1;
                this.rendersteps.rightstep = g_sprites.saraRight2;
                this.path = "right";
                return;
            }
            if(oldX > newx){
                this.rendersteps.leftstep = g_sprites.saraLeft1;
                this.rendersteps.rightstep =g_sprites.saraLeft2;
                this.path ="left";
                return;
            }
            if(oldY < newy){
                //console.log("niður", this.rendersteps.leftstep);
                this.rendersteps.leftstep =  g_sprites.saraDown1;
                this.rendersteps.rightstep =g_sprites.saraDown2;
            this.path = "down";
            return;
            }
            if(oldY > newy){
                this.rendersteps.leftstep =  g_sprites.saraUp1;
                this.rendersteps.rightstep = g_sprites.saraUp2;
                this.path ="up";
                return;
            }
            else{
                //console.log("viljum ekki sjá STAY");
                this.path="stay;"
                return;
            }
        }
        if(this.name == "monster"){
            if(oldX < newx){
                this.rendersteps.leftstep =  g_sprites.monsterWalk1;
                this.rendersteps.rightstep = g_sprites.monsterWalk2;
                this.path = "right";
                return;
            }
            if(oldX > newx){
                this.rendersteps.leftstep = g_sprites.monsterWalk1;
                this.rendersteps.rightstep =g_sprites.monsterWalk2;
                this.path ="left";
                return;
            }
            if(oldY < newy){
                this.rendersteps.leftstep =  g_sprites.monsterClimb1;
                this.rendersteps.rightstep =g_sprites.monsterClimb2;
            this.path = "down";
            return;
            }
            if(oldY > newy){
                this.rendersteps.leftstep =  g_sprites.monsterClimb1;
                this.rendersteps.rightstep = g_sprites.monsterClimb2;
                this.path ="up";
                return;
            }
            else{
                //console.log("viljum ekki sjá STAY");
                this.path="stay;"
                return;
            }
        }       
    };
let g_animations = { 
  bob : new playerAnimation({name :"bob"}),
  sara : new playerAnimation({name :"sara"}),
  monster : new playerAnimation({name :"monster"})
}