/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* provides a set of common functions which can be inherited by all other entities */

function Entity() { };

Entity.prototype.setup =  (descr) => {

  /* for now i think  we only  need to pass down 1 thing
    if the entity is important to update
    shouldUpdateMe = true/false 
    */
  for (var property in descr) {
    this[property] = descr[property];
  }
};

Entity.prototype.resetToDefaultEnt = function(){
  this.isAlive = true;
  this.entityPos.tileX = null;
  this.entityPos.tileY = null;
  this.entityPos.spatialPos = null;
};

Entity.prototype.isAlive = true; // all entities are


Entity.prototype.entityPos = {
                               tileX: null,
                               tileY: null,
                               spatialPos:null };

Entity.prototype.getEntityTilePos = function(){
  return this.entityPos;
};

Entity.prototype.updateEntityTilePos = function(nTileX,nTileY,nspatialPos) {
  this.entityPos = {
    tileX : nTileX,
    tileY : nTileY,
    spatialPos:nspatialPos
  }
};

/* export the Entity so others can use it */
module.exports = {
  Entity,
};