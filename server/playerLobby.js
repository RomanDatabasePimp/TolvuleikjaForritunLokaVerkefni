/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Player = require('./Player').Player; // fetch the tile
// sadly need a quick and dirty way to get the spatialpos from the tile maneger ....
const g_tileManager = require('./tileManager').g_tileManager;

/* logic for checking wich socket is playing what character since 
   many sockets can join the game but only 3 can play it we need to make somekind 
   of handler that keeps track of this */

function GameLobby() {};
  // hold over the avivable players that can be still played by our clients
  GameLobby.prototype._availablePlayers = {
    bob: {
      inputReceived:false, // checks if bob has mabe a move
      player:new Player(  // bob player object
        {
          shouldUpdateMe : true // tells the tile if it should update or not
        },
        {
          // characters name is bob he has his power up in players class
          character:"bob",
          playBy:null,// socket who is playing bob
          stamina:5// init stamina of bob i.e how many tiles he can move in the start
        }
      )
    },
    sara:{
      inputReceived:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"sara",
          stamina:7,
          playBy:null,
        }
      )
    },
    monster:{
      inputReceived:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"monster",
          stamina:10,
          playBy:null
        }
      )
    }
};

/* Usage : g.GetAllPLayers()
    For  : g is a GameLobby
    After: creates a boolean array that says which players are joined */
GameLobby.prototype.GetAllPLayers = function () {
  const players = [false,false,false];
  let inc = 0;
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy){
      players[inc] = true;
    }
    inc ++;
  }
  return players;
}
 
/* Usage : g.resetPlayerInputs()
    FOR  : g is a GameLobby
    After: sets inputReceived to false for players that are playing */
GameLobby.prototype.resetPlayerInputs = function() {
  for(let char in this._availablePlayers){
    if(!this._availablePlayers[char].player.playBy){
      this._availablePlayers[char].inputReceived = false;
    }
  }
};


/* Usage : g.allMadeMove()
    FOR  : g is a GameLobby
    After: checks if all players who are playing have made a move */
GameLobby.prototype.allMadeMove = function() {
  let playersPlaying = this.howManyPlaying();
  for(let char in this._availablePlayers){
    if(!this._availablePlayers[char].player.playBy){
      if(this._availablePlayers[char].inputReceived) {
        playersPlaying -=1;
      } 
    }
  }
  if(playersPlaying === 0){ return true;}
  return false;
};


/* Usage : g.tryJoinGame(sockId)
    FOR  : g is a GameLobby
           sockId is a string
    After: find the first null in _availablePlayers and set its value to the sockId
           and return true */
GameLobby.prototype.tryJoinGame = function(sockId) {
  for(let char in this._availablePlayers){
    if(!this._availablePlayers[char].player.playBy){
      this._availablePlayers[char].player.playBy = sockId; // now the socket is playing this character
      // if the player is already initialized we just let the socket take over
      if(!this._availablePlayers[char].player.entityPos.spatialPos) {
        // if the player is monster he starts in bottom right corner
        if(this._availablePlayers[char].player.character === 'bob'){
          g_tileManager.__tiles[0][0].addEntity(this._availablePlayers[char].player);
        }
        if(this._availablePlayers[char].player.character === 'sara') {
          g_tileManager.__tiles[0][1].addEntity(this._availablePlayers[char].player);
        }
        if(this._availablePlayers[char].character === 'monster'){
          g_tileManager.__tiles[9][9].addEntity(this._availablePlayers[char].player);
        }
      }
      return true;  
    }
  }
  return false;
};

/* Usage : g.leftGame(sockId)
    FOR  : g is a GameLobby
           sockId is a string
    After: search in the _availablePlayers for the sockId and set its value to null  */
GameLobby.prototype.leftGame = function(sockId) {
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy === sockId) {
      /* we want to just remove him from lobby, the player can still be in the 
         tile so the next person can take over if he wants to */
      this._availablePlayers[char].player.playBy = null;
      return; 
    }
  }
};

module.exports = {
  GameLobby,
};