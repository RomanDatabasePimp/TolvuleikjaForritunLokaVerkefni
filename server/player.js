/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Entity = require('./entity').Entity; // fetch the tile


function Player(descr) {
  
  // Common inherited setup logic from Entity
  this.setup(descr);
  
};

Player.prototype = new Entity();