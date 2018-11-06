/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Entity = require('./entity').Entity; // fetch the tile

/* We can have up to 4 players  3 suvivor classes with different traits 
   and 1 monster with a set of his own trains but they share the same common functions*/
function Player(descr,powerup) {
  
  // Common inherited setup logic from Entity
  this.setup(descr);

  
};

Player.prototype = new Entity();

module.exports = {
  Player,
};