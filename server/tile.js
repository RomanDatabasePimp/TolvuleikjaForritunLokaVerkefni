/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* The tile has the following properties
   - each tile is X * X pixels  
   - can contain any amount of players (in our case 3 players and 1 monster)
   - terrain (if contains terrain then you can enter the tile)
   - a tile can belong to some other entitie : f.x House (that can be many tiles) */

let tile = {

  _nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)
  _entities : [],    // containter over all our entities
  
  
  
  }