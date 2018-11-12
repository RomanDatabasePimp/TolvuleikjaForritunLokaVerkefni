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
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false, // checks if bob has mabe a move
      player:new Player(  // bob player object
        {
          shouldUpdateMe : true // tells the tile if it should update or not
        },
        {
          // characters name is bob he has his power up in players class
          character:"bob",
          stamina:6,// init stamina of bob i.e how many tiles he can move in the start
          playBy:null,// socket who is playing bob
          mademove: false,
          movement:[]
        }
      )
    },
    sara:{
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"sara",
          stamina:4,
          playBy:null,
          mademove: false,
          movement:[]
        }
      )
    },
    monster:{
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"monster",
          stamina:10,
          playBy:null,
          mademove: false,
          movement:[]
        }
      )
    }
};

/* Usage : g.updateCords(cord,sockId)
    For  : g is a GamELobby
           cord is a object with properties nX,nY
           sockId is the socket to the player which the client is playing as
   After : updates the player with the corresponding sockId */
GameLobby.prototype.updateCords = function(cord,sockId) {
  const player = this.GetPlayer(sockId);
  // if player hasent m
  if(player.getEntityTilePos().tileX === cord.nX && player.getEntityTilePos().tileY === cord.nY){
    return;
  }
}


/* Usage : g.unreadyPlayers()
    For  : g is a GameLobby
    After: sets all client to not rdy for next round  */
GameLobby.prototype.unreadyPlayers = function() {
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy){
      this._availablePlayers[char].readyForNextRound = false;
    }
  }
} 

/* Usage : g.AllReadyForNextRound()
    For  : g is a GameLobby
    After: returns true if all clients readyForNextRound value is true  */
GameLobby.prototype.AllReadyForNextRound = function() {
  for(let char in this._availablePlayers){
    if(!this._availablePlayers[char].readyForNextRound){
      return false;
    }
  }
  return true;
}

/* Usage : g.setPlayerReady(sockId)
    For  : g is a GameLobby
           sockId is the socket to the player which the client is playing as
    After: sets player to ready for next game round */
GameLobby.prototype.setPlayerReady = function (sockId) {
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy === sockId){
      this._availablePlayers[char].readyForNextRound = true;
    }
  }
}
  

/* Usage : g.GetPlayer(sockId)
    For  : g is a GameLobby
           sockId is the socket to the player which the client is playing as
    After: returns the player obj that the player is playing as */
GameLobby.prototype.GetPlayer = function (sockId) {
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy === sockId){
      return this._availablePlayers[char].player;
    }
  }
  return null;
}


/* Usage : g.countAllPLayers()
    For  : g is a GameLobby
    After: creates a boolean array that says which players are joined */
GameLobby.prototype.countAllPLayers = function () {
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
        if(this._availablePlayers[char].player.character === 'monster'){
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
      this._availablePlayers[char].readyForNextRound = false;
      return; 
    }
  }
};

/* Usage : g.resetLobby()
    For  : g is a GameLobby
    After: Resets the game lobby to its initial state */
GameLobby.prototype.resetLobby = function() {
  this._availablePlayers = {
    bob: {
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false, // checks if bob has mabe a move
      player:new Player(  // bob player object
        {
          shouldUpdateMe : true // tells the tile if it should update or not
        },
        {
          // characters name is bob he has his power up in players class
          character:"bob",
          stamina:6,// init stamina of bob i.e how many tiles he can move in the start
          playBy:null,// socket who is playing bob
          mademove: false,
          movement:[]
        }
      )
    },
    sara:{
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"sara",
          stamina:4,
          playBy:null,
          mademove: false,
          movement:[]
        }
      )
    },
    monster:{
      resetgame: false, // holds if the client wants a reset of the game to happen
      readyForNextRound:false,
      player:new Player(
        {
          shouldUpdateMe : true
        },
        {
          character:"monster",
          stamina:10,
          playBy:null,
          mademove: false,
          movement:[]
        }
      )
    }
  };

  g_tileManager.__tiles[0][0].addEntity(this._availablePlayers["bob"].player);
  g_tileManager.__tiles[0][1].addEntity(this._availablePlayers["sara"].player);
  g_tileManager.__tiles[9][9].addEntity(this._availablePlayers["monster"].player);
  console.log("Lobby reseted !");
};

/* Usage : g.getClient(sockid)
    For  : g is a GameLobby
           sockid is a string
    After: returns the bob,sata or monster if sockId is accosiacted them */
GameLobby.prototype.getClient = function(sockid){
  for(let char in this._availablePlayers){
    if(this._availablePlayers[char].player.playBy === sockid){
      return this._availablePlayers[char];
    }
  }
  return null;
}

/* Usage: g.handleClientReset(sockid)
     For: g is a GameLobby
          sockid is a string
   After: checks if sockid is assosiated with player if it is
          it sets it resetgame to true and if all players are 
          requesting for reset it will return true else false  */
GameLobby.prototype.handleClientReset = function(sockid) {
  const client = this.getClient(sockid); // fetch player
  // if player exists
  if(client) {
    
    client.resetgame = true;
    // check if all players want to reset the game
    for(let char in this._availablePlayers){

      // if one client is not ready to reset then we dont
      if(!this._availablePlayers[char].resetgame) {
        return false;
      }
    }

    return true; // all players agree to reset
  }
  return false;
};

module.exports = {
  GameLobby,
};