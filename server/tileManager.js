/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
const tile = require('./tile').Tile; // fetch the tile
const pickup = require('./pickups').PickUp; // our key

/* Our map is composed of a set of tiles, and the tileManeger holds all the tiles */
let g_tileManager = {

  // all the tiles inside the map
  __tiles: [],
  __tileSize: 10, // size of our map in terms of tileSize*tileSize
  __objPickedUp: 0,
  __gameWon: { players: true, monster: false},

  /* Usage : t.objPickedUp()
      For  : t is a g_tileManager object
      After: adds one 1 to objPickedUp  */
  objPickedUp : function(){
    this.__objPickedUp++;
  },

  /* Usage : t.tyToMoveToNextTile(source,dest)
      For  : t is a g_tileManager object
             source is a obj {x: , y:}
             dest is a obj   {x: , y:} 
      After: returns true if you can move from tile source to tile dest
             note this only checks for one step !!!!!! */
  tyToMoveToNextTile : function(source,dest) {
    console.log("movement source =",source, " to dest=",dest);
    // if we try to move down
    if((source.x+1 === dest.x && source.y === dest.y) && !(source.x+1 >= this.__tileSize))  {
      if(!this.__tiles[dest.x][dest.y]._amITerrain) { return true;}
      return false;
    }

    // if we try to move up
    else if((source.x-1 === dest.x && source.y === dest.y) && !(source.x-1 < 0)){
      if(!this.__tiles[dest.x][dest.y]._amITerrain) { return true;}
      return false;
    }

    // if we try to move left
    else if((source.x === dest.x && source.y-1 === dest.y) && !(source.y-1 < 0)){
      if(!this.__tiles[dest.x][dest.y]._amITerrain) { return true;}
      return false;
    }

    // if we try to move right
    else if((source.x === dest.x && source.y+1 === dest.y) && !(source.y+1 >= this.__tileSize)){
      if(!this.__tiles[dest.x][dest.y]._amITerrain) { return true;}
      return false;
    }
    
    // no legal moves found
    else {
      return false
    }
  },
  /* Usage : t.createNewEmptyMap()
      For  : t is g_tileManager object
     After : creates tileSize*tileSize array of tiles where each tile entries
             are configured correctly */
  createNewEmptyMap : function()  {
    for(let i = 0; i < this.__tileSize; i++){
      let tiles=[];
      for(let j=0; j < this.__tileSize; j++){
        let newTile =  new tile({ _TilePosX : i, _TilePosY: j });
        tiles[j] = newTile;
      }
      this.__tiles[i] = tiles;
    }
    console.log("empty map has been initialized !"); // for debbugin
    this.generateNewMaze();
  },
  
  /* Usage : t.generateNewMaze()
      For  : t is g_tileManager object
     After : create terrain on the map and maybe add houses and stuff*/
  generateNewMaze : function() {
    // matrix generated to quickly create maps.
    // 1 is terrain, 2 is a structure. 0 is area which can be traversed
    let mapMatrix = [
      [0,0,0,1,0,0,0,2,2,3],
      [0,0,0,0,0,1,0,2,2,2],
      [0,0,1,0,0,0,0,2,2,2],
      [1,0,0,0,1,1,0,0,0,0],
      [1,0,1,0,1,1,0,0,0,0],
      [0,0,0,0,4,0,0,0,1,0],
      [0,0,0,1,0,2,2,0,0,0],
      [2,2,2,0,0,2,2,0,0,1],
      [2,2,2,0,0,0,0,1,0,0],
      [3,2,2,0,0,1,0,0,0,0]
    ];
    for(let i = 0; i < this.__tileSize; i++){
      for(let j = 0; j < this.__tileSize;j++){
        if(mapMatrix[j][i] == 1){
          this.__tiles[j][i]._amITerrain = true;
        }
        if(mapMatrix[j][i] == 2){
          this.__tiles[j][i]._amIAStructure = true;
        }
        if(mapMatrix[j][i] == 3){
          this.__tiles[j][i]._amIAStructure = true;
          this.__tiles[j][i].addEntity(new pickup ({ shouldUpdateMe:false },{ type:"key"}));
        }
        if(mapMatrix[j][i] == 4){
          this.__tiles[j][i].addEntity(new pickup ({ shouldUpdateMe:false },{ type:"key"}));
        }
      }
    }
  },

}
/* export the tile maneger so we can use it */
module.exports = {
  g_tileManager,
};