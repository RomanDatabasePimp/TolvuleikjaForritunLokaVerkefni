/* if we want to make a new power up we just declare its type
   tosomething else for now we have 2 - key,redbull. if we would want to
   add more we would just make a pickup with the new type and add the support
   for sed pickup in the FTL */

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