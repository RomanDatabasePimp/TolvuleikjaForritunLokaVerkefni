/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

const Player = require('./player').Player; // fetch the tile

/* logic for checking wich socket is playing what character since 
   many sockets can join the game but only 4 can play it we need to make somekind 
   of handler that keeps track of this */

function GameLobby() {};

// hold over the avivable players that can be still played by our clients
GameLobby.prototype._avivablePlayers = {
  bob: {
    playBy:null,        // socket who is playing bob
    inputRecived:false, // checks if bob has mabe a move
    player:null         // bob player object
  },
  gill:{
    playBy:null,
    inputRecived:false,
    player:null
  },
  mike:{
    playBy:null,
    inputRecived:false,
    player:null
  },
  monster:{
    playBy:null,
    inputRecived:false,
    player:null
  }
};

/* Usage : g.howManyPlaying()
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
  const amount = 0;
  for(let char in this._avivablePlayers){
    if(!this._avivablePlayers[char].playBy){
      amount +=1; 
    }
  }
  return amount;
};

/* Usage : g.allMadeMove()
    FOR  : g is a GameLobby
    After: checks if all players who are playing have made a move */
GameLobby.prototype.allMadeMove = function() {
  const playersPlaying = this.howManyPlaying();
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
      this._avivablePlayers[char].playBy = sockId;
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
    if(this._avivablePlayers[char].playBy === sockId){
      this._avivablePlayers[char].playBy = null;
      return; 
    }
  }
}; 

module.exports = {
  GameLobby,
};