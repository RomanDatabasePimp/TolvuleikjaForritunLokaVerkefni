/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* provides a set of common functions which can be inherited by all other entities */

function Entity() { };

Entity.prototype.setup =  (descr) => {
  /* for now i think  we only  need to pass down 1 thing
     if the entity is important to update shouldUpdateMe = true/false   */
  for (var property in descr) {
    this[property] = descr[property];
  }
};

Entity.prototype.isAlive = true; // all entities start alive

/* where is this entity located in the map :
   (tileX,tileY) = what tile
   spatialPos = in the tile where is it */
Entity.prototype.entityPos = { tileX: null,
                               tileY: null,
                               spatialPos:null };

/* Usage : e.resetToDefaultEnt()
     For : e is an Entity
   After : resets all of the Entities attributes to 
           default states */
Entity.prototype.resetToDefaultEnt = function(){
  this.isAlive = true;
  this.entityPos.tileX = null;
  this.entityPos.tileY = null;
  this.entityPos.spatialPos = null;
};
                              
Entity.prototype.getEntityTilePos = function(){
  return this.entityPos;
};

/* Usage : e.updateEntityTilePos(nTileX,nTileY,nspatialPos)
     For : e is an Entity
           (tileX,tileY) = what tile
           spatialPos = in the tile where is it
   After : updates the entityPos of the Entity with the given values */
Entity.prototype.updateEntityTilePos = function(nTileX,nTileY,nspatialPos) {
  this.entityPos = {
    tileX : nTileX,
    tileY : nTileY,
    spatialPos:nspatialPos
  }
};
Entity.prototype.kill = function(){
  this.isAlive = false;
}
/* export the Entity so others can use it */
module.exports = {
  Entity,
};