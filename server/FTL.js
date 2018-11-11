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
  const lobbyState = GameLobby.countAllPLayers(); // fetch array
  for(let i =0; i < lobbyState.length; i++){
     if(lobbyState[i] === false) {
      return { alljoined : false, hasnotgamestarted : lobbyState }
     }
  }
  return { alljoined : true, hasnotgamestarted : null }
}

/* Usage : allPlayersReadyForNextRound()
    For  : nothing
   After : returns true if all players are ready to start next round */
function allPlayersReadyForNextRound(){
  return GameLobby.AllReadyForNextRound();
}

/* Usage : setPlayerReadyForNextRound(sockID)
    For  : sockId is a string
   After : sets the player with the sockId ready to play next round */
function setPlayerReadyForNextRound(sockID) {
  GameLobby.setPlayerReady(sockID);
}

/* Usage : setPlayerNotReadyForNextRound()
    For  : nothing
   After : sets all players to not ready to do next round */
function setPlayerNotReadyForNextRound() {
  GameLobby.unreadyPlayers();
}

/* Usage : updatePlayer(sockid,inp)
    For  : sockid is a string
           inp is a obj { nX, nY }
    After: updates the player that has the sockid */
function updatePlayer(sockid,inp) {
  // fetch the player that is trying to make the move
  let player = GameLobby.GetPlayer(sockid);

  /* if client is monster deadorkilled says that he can killed someone
     if client is suvior deadorkilled says they have been killed by monster  */
  let deadorkilled = false; 
  
  // if player dosent exists we dont update duh
  if(!player) { return;}

  // total legal path the player took 
  let steps = [];
  
  // add where the player is originally
  steps.push({step :{ x: player.getEntityTilePos().tileX,
                      y: player.getEntityTilePos().tileY}});

  /* if the player did not move or used power ups he gets extra stamina 
      because he is well reseted */
  if(inp.steps.length === 0 && !inp.powerUp){
    player.staminaBuff(4);
    return; // we dont need to update the since he dint do anything
  }
  /* TO DO IMPLEMENT POWER UP */
  
  // try to go over all the moves but stop when its imposible
  for(let i= 0; i < inp.steps.length; i++) {
    let nextMove = inp.steps[i].step; // get next step
  
    /* check if player has enough stamina to move and if the movement is legal */
    if(player.stamina > 0 && g_tileManager.tyToMoveToNextTile({x: player.getEntityTilePos().tileX,
                                                               y: player.getEntityTilePos().tileY},
                                                               nextMove)){
      /* since we have enough stamina and can move in tile we need to check if this tile 
         contains objective pick up entities or colliles with monster/player */

      // check if player exists in this tile
      const playerExists = g_tileManager.__tiles[nextMove.x][nextMove.y].doIContainPlayer();
      /* if player exists in next tile we need to check if its monster or suvivor */
      if(playerExists) {
        // this client is a suvior 
        if(player.character === 'bob' || player.character === 'sara' ) {
          // if colliding player is a suvivor we stop
          if(playerExists.character === 'bob' || playerExists.character === 'sara' ){
            break;
          } 
          // you collided with a monster
          else {
            deadorkilled = true;
            player.isAlive = false;
          }
        }
        // this client is  a monster
        else {
          deadorkilled = true;
          playerExists.isAlive = false; // kill the one who collided with player
        }
      }

      /* if player is still alive and the client is not a monster we need to check 
         the tile for pick ups  */
      if(!deadorkilled && !player.character==='monster') {
        
        // get things that can be picked up in the tile
        const pickups = g_tileManager.__tiles[nextMove.x][nextMove.y].doIContainPickUps();
        /* At this point the game will contain 2 interactibles 
           -pill (powerup) : increases stamina by 5 when used */
        for(let i = 0; i < pickups.length; i++){
          // if its a key we pick it up
          if(pickups[i].hasOwnProperty('key')) {
            g_tileManager.objPickedUp(); // pick the obj up
            pickups[i].isAlive = false;  // kill the key
          }

        }
      }

      // remove the player from the tile 
      g_tileManager.__tiles[player.getEntityTilePos().tileX][player.getEntityTilePos().tileY]
                   .removeEntity(player.getEntityTilePos().spatialPos);
      // set the player in the new tile 
      g_tileManager.__tiles[nextMove.x][nextMove.y].addEntity(player);
      
      // add the step into our legal
      steps.push({step :{ x: player.getEntityTilePos().tileX,
        y: player.getEntityTilePos().tileY}});
         
      // subtrack one stamina from player
      player.staminaDrain();

      // if killed someone or died then we stop
      if(deadorkilled) { break; }                                      
    } else {
      break; // no more legal steps
    }
  }

  //update the players next steps for drawing out no game logic
  player.setNextMovement(steps);
  // add player stamina
  player.staminaBuff(2);
}


/* Usage : updateStateAndReturn()
    For  : nothing
    After: updates the gameState and returns the updated tile maneger */
function updateStateAndReturn() {
  let deadplayers = 0;
  /* We need to check if the players are alive if they are no we remove them */
  for(let player in GameLobby._availablePlayers){
    // if player is not alive we delete him
    if(!GameLobby._availablePlayers[player].player.isAlive){
      deadplayers ++; // count the dead suvivors
      // the pos of the dead player
      const pos = GameLobby._availablePlayers[player].player.getEntityTilePos();
      // if the players died this round
      if(pos.tileX) {
        g_tileManager.__tiles[pos.tileX][pos.tileY].removeEntity(pos.spatialPos);
        GameLobby._availablePlayers[player].player.updateEntityTilePos(null,null,null);
      }
    }
  }

  /* check if the game is over */

  // if players have collected all the keys they win
  if(g_tileManager.__objPickedUp === 3) {
    g_tileManager.__gameWon.players = true;
  }

  // if all players died then the monster won
  if(deadplayers === 2) {
    g_tileManager.__gameWon.monster = true;
  }

  return g_tileManager;
}


/* export the game functions  */
module.exports = {
  createGameMap,
  tryToJoinGame,
  leaveGame,
  allPlayersJoined,
  updateStateAndReturn,
  allPlayersReadyForNextRound,
  setPlayerReadyForNextRound,
  setPlayerNotReadyForNextRound,
  updatePlayer,
  g_tileManager
};