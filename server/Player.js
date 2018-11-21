/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Entity = require('./entity').Entity; // fetch the tile

/* We can have up to 3 players  2 suvivor classes  and 1 monster
   and this players all share same funcionallity */
function Player(descr,player) {
  
  // Common inherited setup logic from Entity
  this.setup(descr);

  /* want the stamina , and whatPLayer */
  for (var property in player) {
    this[property] = player[property];
  }

};

Player.prototype = new Entity(); // A player is an entity nuff said ...

/* Usage : p.resetToDefaultPlayer()
     For : p is a Player
    After: resets the player to default state */
Player.prototype.resetToDefaultPlayer = function(){
  this.mademove = false;
  this.movement = [];
  if(this.character ==="monster") {
    this.stamina = 10;
  }
  else if(this.character === "bob") {
    this.stamina = 6;
  }
  else {
    this.stamina = 4;
  }
  
}

/* Usage : p.activatePowerUp()
     For : p is a Player
    After: if players powerup is true then the type powerup is called */
Player.prototype.activatePowerUp = function(){
  if(this.powerup){
    // as of now we only have one power up we might have more later
    if(this.powerup === "redbull") {
      this.stamina +=5;
      this.powerup=null;
    }
  }
}

/* Usage : p.staminaBuff(stamina)
    For  : p is a Player
           stamina is a integer
    After: updates the stamina of the player */
Player.prototype.staminaBuff = function(stamina) {
  this.stamina += stamina;
  // if stamina exeds 10 we cap it at 10
  if(this.stamina > 10) {
    this.stamina = 10;
  }
}

/* Usage : p.staminaDrain()
    For  : p is a Player
    After: decreases players stamina by one */
Player.prototype.staminaDrain = function() {
  this.stamina -= 1;
}

/* Usage : p.setNextMovement(steps)
    For  : steps is a array of steps each step is { x, y}
    After: sets the steps on the player */
Player.prototype.setNextMovement = function(steps) {
  // if there are more than 2 steps that means player has changed tiles
  if(steps.length > 1) { this.mademove = true; }
  this.movement = steps;
 }

module.exports = {
  Player,
};