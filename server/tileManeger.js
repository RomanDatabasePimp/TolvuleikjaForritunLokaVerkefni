/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
const tile = require('./tile').Tile; // fetch the tile

/* Our map is composed of a set of tiles, and the tileManeger holds all the tiles */
let g_tileManger = {

  // all the tiles inside the map
  __tiles: [],
  __tileSize: 2, // size of our map in terms of tileSize*tileSize

  /* Usage : t.updateTiles(du)
      For  : t is a g_tileManger object
             du is delta time /nominal rate
      After: calls the updater for each tile in __tiles */
  updateTiles: function (du) {
    for(let i = 0; i < this.__tiles.length; i++) {
      for(let j=0; j < this.__tiles[i].length; j++) {
        this.__tiles[i][j].updateTiles(du);
      }
    }
  },

  /* Usage : t.createNewEmptyMap()
      For  : t is g_tileManger object
     After : creates tileSize*tileSize array of tiles where each tile entries
             are configured correctly */
  createNewEmptyMap : function() {
    for(let i = 0; i < this.__tileSize; i++){
      let tiles=[];
      for(let j=0; j < this.__tileSize; j++){
        let newTile =  new tile({ _TilePosX : i, _TilePosY: j });
        // if its the top tiles then u cant enter them from the top
        if(i === 0) { newTile._canEnterFrom.top = false; }
        // if bottom tiles of the map then u cant enter from bottom
        if(i === tileSize-1) { newTile._canEnterFrom.down = false; }
        // if on the left corner of the map then u cant enter
        if(j === 0 ){ newTile._canEnterFrom.left = false; }
        // if on the left corner of the map then u cant enter
        if(j === tileSize-1 ){  newTile._canEnterFrom.right = false; }
        tiles[j] = newTile;
      }
      this.__tiles[i] = tiles;
    }
    //console.log("empty map has been initialized !");
    //console.log(this.__tiles);
  },
  
  /* Usage : t.generateNewMaze()
      For  : t is g_tileManger object
     After : create terrain on the map and maybe add houses and stuff*/
  generateNewMaze : function() {
    /* rafnar knock urself out BOI ! */
  },


}

/* export the tile maneger so we can use it */
module.exports = {
  g_tileManger,
};