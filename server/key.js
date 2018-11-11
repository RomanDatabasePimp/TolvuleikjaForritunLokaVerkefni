/* all 4 keys have to be collected inorder for suviors to win */

const Entity = require('./entity').Entity; // fetch the tile

function Key(descr) {
  // Common inherited setup logic from Entity
  this.setup(descr);
};

Key.prototype = new Entity(); // A key  is an entity nuff said ...

Key.prototype.key = 'Key';

/* export the Entity so others can use it */
module.exports = {
  Key,
};