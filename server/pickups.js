/* all 4 keys have to be collected inorder for suviors to win */

const Entity = require('./entity').Entity; // fetch the tile

function PickUp(descr,whatpickup) {

  // Common inherited setup logic from Entity
  this.setup(descr);

  for (var property in whatpickup) {
    this[property] = whatpickup[property];
  }
  
};

PickUp.prototype = new Entity(); // A key  is an entity nuff said ...

/* export the Entity so others can use it */
module.exports = {
  PickUp,
};