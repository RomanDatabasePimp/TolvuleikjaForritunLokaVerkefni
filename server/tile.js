/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* The tile has the following properties
   - each tile is X * X pixels  
   - can contain any amount of players (in our case 3 players and 1 monster)
   - tile can contain the powerup or the objective pick up
   - terrain (if contains terrain then you cant enter the tile)
   - a tile can belong to some other entitie : f.x House (that can be many tiles) */

function Tile(descr) {
  /* We want to get _TilePosX and _TilePosY */
  for(let property in descr) { this[property] = descr[property]; }

  this._nextSpatialID = 1; // make all valid IDs non-falsey (i.e. don't start at 0)
  this._entities = [];    // containter over all our entities
  this._size = 64; // Size of the tile in terms of pixels
  this._amITerrain= false;// tells us if this tile is just a terrain blocking the cell

  /* some tiles can be a part of somekind of structure f.x like a house and
     this tells you if this tile is a part of that house */
  this._amIAStructure=null;

  /* Usage : t.addEntity(ent)
      For  : t is a Tile 
             ent is a Entity
      After: adds the Entity in this tile  */
  this.addEntity = function(ent) {
    const newSpID = this._nextSpatialID ++; // get the new spatial id
    this._entities[newSpID] = ent; // add the entity in the tile
    // update the that  entitys position
    ent.updateEntityTilePos(this._TilePosX,this._TilePosY,newSpID);
  };
  
  /* Usage : t.removeEntity(spdID)
      For  : t is a Tile 
             spdID is the location in the tile
      After: removes the entity in tiles container */
  this.removeEntity = function(spId) {
    delete this._entities[spId];
  };

};

/* export the tile so we can work with it in tileManeger */
module.exports = {
  Tile,
};