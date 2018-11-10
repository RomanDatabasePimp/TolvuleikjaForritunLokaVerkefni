/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* You can say this is where our components come together to form the awesome game */

// our tile manager the one that keeps the state of the map
const g_tileManager = require('./tileManager').g_tileManager;
// hold over the sockets that are playing the game
const GameLobby =  new(require('./playerLobby').GameLobby);

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
   After : returns boolean if all players are occupied by sockets */
function allPlayersJoined() {
  const lobbyState = GameLobby.GetAllPLayers(); // fetch array
  for(let i =0; i < lobbyState.length; i++){
     if(lobbyState[i] === false) {
      return { alljoined : false, hasnotgamestarted : lobbyState }
     }
  }
  return { alljoined : true, hasnotgamestarted : null }
}

/* Usage : updateStateAndReturn()
    For  : nothing
    After:
 */
function updateStateAndReturn() {

  return g_tileManager;
}


/* export the game functions  */
module.exports = {
  createGameMap,
  tryToJoinGame,
  leaveGame,
  allPlayersJoined,
  updateStateAndReturn
};