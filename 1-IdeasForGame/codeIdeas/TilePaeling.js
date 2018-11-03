/* Usage : obj = new Tile(descr)
    For  : descr is an arbitrary amount of constants
   After : creates a new Tile obj with the amount of constants passed */
function Tile(descr) {
  /* The whole map is constructed of tiles each tile is X*X size in pixels 
     this tile can contain many enties or it could be occupied by terrain in wich then
     you cant move into it  */
  /* the arguments passed could be tilePosX,tilePosY */
  for(let property in descr) {
    this[property] = descr[property];
  }
}

Tile.prototype.__nextFreeSpace = 0; // gives u the next free space inside this tile
Tile.prototype.__entities = [];  // all the entities occuping the tile
Tile.prototype.__powerUp = null; // the tile could hold a power up at most one ! should store powerup Entitie
Tile.prototype.__canYouEnterMe = false; // indicates if you can enter this tile or not overAll
/* Many tiles could be grouped into some kind of object f.x like a house this value would hold
   that is this tile part of  */
Tile.prototype.__doIBelongToSomeoneElse = null;

/* legal movements that you can do to get into this tile */
Tile.prototype.__canMoveFromLeft = false;
Tile.prototype.__canMoveFromRight = false;
Tile.prototype.__canMoveFromUp = false;
Tile.prototype.__canMoveFromDown = false;

// return the next free space that an entitie could enter inside this tile
Tile.prototype.getNextFreeSpace = function(){ return this.__nextFreeSpace ++; };

Tile.prototype.addEntitieToMe = function(entie){
  const Pos = this.getNextFreeSpace();
  this.__entities[Pos] = entie;
  /* need to update the intitie itself that its new Home is tilePosX,tilePosY,SpecialPos */  
};
