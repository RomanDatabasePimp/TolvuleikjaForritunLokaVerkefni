/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Player = require('./player').Player; // fetch the tile
// sadly need a quick and dirty way to get the spatialpos from the tile maneger ....
const g_tileManger = require('./tileManeger').g_tileManger;

/* logic for checking wich socket is playing what character since 
   many sockets can join the game but only 4 can play it we need to make somekind 
   of handler that keeps track of this */

function GameLobby() {};

// hold over the avivable players that can be still played by our clients
GameLobby.prototype._avivablePlayers = {
  bob: {
    playBy:null,        // socket who is playing bob
    inputRecived:false, // checks if bob has mabe a move
    player:new Player(  // bob player object
      {
        shouldUpdateMe : true // tells the tile if it should update or not
      },
      {
        // characters name is bob he has his power up in players class
        character:"bob",
        stamina:5 // init stamina of bob i.e how many tiles he can move in the start
      }
    )
  },
  fillip:{
    playBy:null,
    inputRecived:false,
    player:new Player(
      {
        shouldUpdateMe : true
      },
      {
        character:"filip",
        stamina:3
      }
    )
  },
  sara:{
    playBy:null,
    inputRecived:false,
    player:new Player(
      {
        shouldUpdateMe : true
      },
      {
        character:"sara",
        stamina:7
      }
    )
  },
  monster:{
    playBy:null,
    inputRecived:false,
    player:new Player(
      {
        shouldUpdateMe : true
      },
      {
        character:"monster",
        stamina:10
      }
    )
  }
};

/* Usage : g.getPlayer(sockId)
    FOR  : g is a GameLobby
           sockID is the socket id
    After: returns the player object that maches the sockID */
GameLobby.prototype.getPlayer = function(sockID) {
  for(let char in this._avivablePlayers){
    if(this._avivablePlayers[char].playBy === sockID){
      return this._avivablePlayers[char].player; // return the player
    }
  }
  return null; // should almost never happen in a perfect world
};

/* Usage : g.resetPlayerInputs()
    FOR  : g is a GameLobby
    After: sets inputRecived to false for players that are playing */
GameLobby.prototype.resetPlayerInputs = function() {
  for(let char in this._avivablePlayers){
    if(!this._avivablePlayers[char].playBy){
      if(this._avivablePlayers[char].inputRecived) {
        this._avivablePlayers[char].inputRecived = false;
      } 
    }
  }
};

/* Usage : g.howManyPlaying()
    FOR  : g is a GameLobby
    After: returns the number of sockets that are playing the game */
GameLobby.prototype.howManyPlaying = function() {
  let amount = 0;
  for(let char in this._avivablePlayers){
    if(this._avivablePlayers[char].playBy){
      amount +=1; 
    }
  }
  return amount;
};

/* Usage : g.allMadeMove()
    FOR  : g is a GameLobby
    After: checks if all players who are playing have made a move */
GameLobby.prototype.allMadeMove = function() {
  let playersPlaying = this.howManyPlaying();
  for(let char in this._avivablePlayers){
    if(!this._avivablePlayers[char].playBy){
      if(this._avivablePlayers[char].inputRecived) {
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
    After: find the first null in _avivablePlayers and set its value to the sockId
           and return true */
GameLobby.prototype.tryJoinGame = function(sockId) {
  for(let char in this._avivablePlayers){
    if(!this._avivablePlayers[char].playBy){
      this._avivablePlayers[char].playBy = sockId; // now the socket is playing this character
      // if the player is already initialized we just let the socket take over
      if(!this._avivablePlayers[char].player.entityPos.spatialPos) {
        // if the player is monster he starts in bottom right corner
        if(this._avivablePlayers[char].character === 'monster'){
          g_tileManger.__tiles[9][9].addEntity(this._avivablePlayers[char].player);
        } else {
          // all players start in the top left corner
          g_tileManger.__tiles[0][0].addEntity(this._avivablePlayers[char].player);
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
    After: search in the _avivablePlayers for the sockId and set its value to null  */
GameLobby.prototype.leftGame = function(sockId) {
  for(let char in this._avivablePlayers){
    if(this._avivablePlayers[char].playBy === sockId) {
      /* we want to just remove him from lobby, the player can still be in the 
         tile so the next person can take over if he wants to */
      this._avivablePlayers[char].playBy = null;
      return; 
    }
  }
};

module.exports = {
  GameLobby,
};