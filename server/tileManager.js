/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
const tile = require('./tile').Tile; // fetch the tile

/* Our map is composed of a set of tiles, and the tileManeger holds all the tiles */
let g_tileManager = {

  // all the tiles inside the map
  __tiles: [],
  __tileSize: 10, // size of our map in terms of tileSize*tileSize

  /* Usage : t.getShortestPath(source,dest) 
      For  : t is g_tileManager object
             source the starting point
             dest is the destination point
      After: returns the shortest path from source to dest, null otherwise */
  getShortestPath(source,dest){
    // if the starting or end point are on terrain then we dont proccede
   // if(this.__tiles[source.nx][source.ny]._amITerrain || this.__tiles[dest.nx][dest.ny]._amITerrain ){
   //   return null;
   // }
    // fix path id'S 
    let pathind = 1;
    let path = [];// map out the path to the dest
    let qp = []; // queue for finding the distance 
    
    // current path starts at 0
    let current = { parrpos:pathind,x: source.x, y:source.y, dist:0};
    qp.push(current);
    path[pathind++] = current;

    while (qp.length > 0) {
      // get the current tile pos
      current = qp.pop();
      // check if we have arrived in our dest
      if(current.x === dest.nx && current.y === dest.ny) {
        let dist = current.dist + 1;
        path[pathind++] =  { parrpos:pathind,x: current.x, y:current.y, dist:dist};
      }
    
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
      [0,0,0,1,0,0,0,2,2,2],
      [0,0,0,0,0,1,0,2,2,2],
      [0,0,1,0,0,0,0,2,2,2],
      [1,0,0,0,1,1,0,0,0,0],
      [1,0,1,0,1,1,0,0,0,0],
      [0,0,0,0,0,0,0,0,1,0],
      [0,0,0,1,0,2,2,0,0,0],
      [2,2,2,0,0,2,2,0,0,1],
      [2,2,2,0,0,0,0,1,0,0],
      [2,2,2,0,0,1,0,0,0,0]
    ];
    for(let i = 0; i < this.__tileSize; i++){
      for(let j = 0; j < this.__tileSize;j++){
        if(mapMatrix[i][j] == 1){
          this.__tiles[i][j]._amITerrain = true;
        }
        if(mapMatrix[i][j] == 2){
          this.__tiles[i][j]._amIAStructure = true;
        }
      }
    }
  },

}
/* export the tile maneger so we can use it */
module.exports = {
  g_tileManager,
};