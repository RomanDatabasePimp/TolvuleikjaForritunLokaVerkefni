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
  updateTiles: function(du) {
    for(let i = 0; i < this.__tiles.length; i++) {
      for(let j=0; j < this.__tiles[i].length; j++) {
        /* to do  */
      }
    }
  },

  /* Usage : t.createNewEmptyMap()
      For  : t is g_tileManger object
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