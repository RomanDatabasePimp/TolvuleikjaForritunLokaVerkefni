/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* provides a set of common functions which can be inherited by all other entities */

function Entity() { };

Entity.prototype.setup =  (descr) => {

  /* for now i think  we only  need to pass down 2 thing
    the entities location in the tile 
    entityPos = {
      tileX,
      tileY,
      spatialPos,
    },
    if the entity is important to update
    shouldUpdateMe = true/false 
    */
  for (var property in descr) {
    this[property] = descr[property];
  }
};

Entity.prototype.getEntityTilePos = function(){
  return this.entityPos;
};

Entity.prototype.updateEntityTilePos = function(nTileX,nTileY,nspatialPos) {
  this.entityPos = {
    tileX : nTileX,
    tileY : nTileY,
    spatialPos,nspatialPos
  }
};

/* export the Entity so others can use it */
module.exports = {
  Entity,
};