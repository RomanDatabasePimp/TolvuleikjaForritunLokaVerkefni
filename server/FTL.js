/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* You can say this is where our components come together to form the awesome game */

// our tile manager the one that keeps the state of the map
const g_tileManager = require('./tileManager').g_tileManager;
// hold over the sockets that are playing the game
const GameLobby =  new(require('./playerLobby').GameLobby);
 
let gameHasStarted = false; // tells us if the game has started

/* Usage : resetGame()
    For  : nothing
   After : calls all the nessesary services to reset the game */
function resetGame(){
   this.createGameMap(); // start by generating the map
}

/* Usage : createGameMap()
    For  : nothing
   After : calls the tile maneger to generate a playing field for the players */
function createGameMap() {
  // start by making a 10x10 array of tiles
  g_tileManager.createNewEmptyMap();
  // add the terrain on the map
  /* to do... rafnars home */
}

/* Usage : tryToJoinGame(sockId)
     For : sockId is the client socket connected to the server
   After : returns true if the socket has joined the game */
function tryToJoinGame(sockId) {
  return GameLobby.tryJoinGame(sockId);
}

/* Usage : leaveGame(sockId)
     For : sockId is the client socket connected to the server
   After : calls the game lobby to remove the client from the game */
function leaveGame(sockId) {
  GameLobby.leftGame(sockId);
}

/* Usage : allPlayersJoined()
     For : nothing
   After : returns true if all players are occupied by sockets */
function allPlayersJoined() {
  return GameLobby.howManyPlaying() === 3;
}


/* export the game functions  */
module.exports = {
  createGameMap,
  tryToJoinGame,
  leaveGame,
  resetGame,
  allPlayersJoined
};