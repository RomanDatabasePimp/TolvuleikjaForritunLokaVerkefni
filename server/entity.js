/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* provides a set of common functions which can be inherited by all other entities */

function Entity() { };

Entity.prototype.setup = function (descr) {

  /* for now i think  we only  need to pass down 
    entityPos = {
      tileX,
      tileY,
      spatialPos,
    }   */
  for (var property in descr) {
    this[property] = descr[property];
  }
};

Entity.prototype.getEntityTilePos = function() {
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