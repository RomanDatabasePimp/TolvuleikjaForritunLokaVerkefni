/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* This is the holy place which our server logic comes together and forms 
   our game some functions here might be onliner calling others onelines.
   The initial idea was that this class had to be the one that combines all
   the services we have i.e (PLayer,pickup,tileManeger etc) into a working game  */

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
   After : returns a obj with a attribute of true
           if all players are occupied by sockets */
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
    For  : sockId is the client socket connected to the server
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
    For  : sockId is the client socket connected to the server
           inp is a obj { nX, nY }
    After: updates the player that has the sockid */
function updatePlayer(sockid,inp) {
  // fetch the player that is trying to make the move
  let player = GameLobby.GetPlayer(sockid);
  /* if the player picked up a power up THIS ROUND 
     he cant used it on the same round */
  let pickedupthisround = false; 

  /* if client is monster deadorkilled says that he can killed someone
     if client is suvior deadorkilled says they have been killed by monster  */
  let deadorkilled = false; 
  
  // if player dosent exists we dont update duh
  if(!player) { return; }
  // if player is dead we return
  if(!player.isAlive){ 
    console.log("player not alive");
    return;}
  console.log("player alive - updating");
  // total legal path the player took 
  let steps = [];
  
  // add where the player is originally
  steps.push({step :{ x: player.getEntityTilePos().tileX,
                      y: player.getEntityTilePos().tileY}});

  /* if the player did not move or used power ups he gets extra stamina 
      because he is well reseted */
  if(inp.steps.length === 0 && !inp.powerUp){
    //update the players next steps for drawing out no game logic
    player.setNextMovement(steps);
    player.staminaBuff(4);
    return; // we dont need to update the since he dint do anything
  }

  // try to go over all the moves the player made  and stop on the first illegal move
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
          // you collided with a monster u die
          else {
            deadorkilled = true;
            player.kill();
          }
        }
        // this client is  a monster
        else {
          deadorkilled = true;
          playerExists.kill(); // kill the one who collided with player
        }
      }

      /* if player is still alive  */
      if(!deadorkilled) {

        // get things that can be picked up in the tile
        const pickups = g_tileManager.__tiles[nextMove.x][nextMove.y].doIContainPickUps();
        /* At this point the game will contain 2 interactibles
           - key (objective)  : have to pickup 3 to win the game
           -redbull (powerup) : increases stamina by 5 when used */
        for(let i = 0; i < pickups.length; i++){
          
          // if its a key the monster cant pick up the key duh would be unfair
          if(pickups[i].type === 'key' && !(player.character==='monster')) {
            g_tileManager.objPickedUp(); // pick the obj up
            pickups[i].isAlive = false;  // kill the key
          }

          // if its powerup we add it to the clients power up
          if(pickups[i].type === 'powerup'){
            pickedupthisround = true;
            player.powerup = "redbull";
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

      /* if killed someone or died then we stop, if played died then he cant move
         if monster killed someone he cant continue to move he stops there */
      if(deadorkilled) { break; }                                      
    } else {
      break; // no more legal steps
    }
  }
  
  // if client activated the power up
  if(inp.powerUp && !pickedupthisround){
    player.activatePowerUp();
  }
  //update the players next steps for drawing out no game logic
  player.setNextMovement(steps);

  // add player stamina
  if(player.character === "sara") {
    player.staminaBuff(3);
  } else {
    player.staminaBuff(2);
  }
  
}


/* Usage : updateStateAndReturn()
    For  : nothing
    After: updates the gameState and returns the updated tile maneger */
function updateStateAndReturn() {
  let deadplayers = 0;
  
  /* since players are stored in the GameLobby and in the tiles
     we can plock them out and update them right away and remove them from the tiles
     but not from the gamelobby  */
  for(let player in GameLobby._availablePlayers){
    // if player is not alive we delete him
    if(!GameLobby._availablePlayers[player].player.isAlive){
      deadplayers ++; // count the dead suvivors
      // the pos of the dead player
      const pos = GameLobby._availablePlayers[player].player.getEntityTilePos();
      // if the players died this round
      if(pos.tileX) {
        g_tileManager.__Deadplayers.push(GameLobby._availablePlayers[player]);
        g_tileManager.__tiles[pos.tileX][pos.tileY].removeEntity(pos.spatialPos);
        GameLobby._availablePlayers[player].player.updateEntityTilePos(null,null,null);
      }
    }
  }
  
  /* this loop just every entity that is dead and is only stored in the tiles
     if you remove these types of entities they will be collected by the garbage colloector
     there are no other instances of them outside the tilemanager */
  for(let i = 0; i < g_tileManager.__tiles.length; i++) {
    for(let j=0; j < g_tileManager.__tiles.length; j++) {
      g_tileManager.__tiles[i][j].update();
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
  
  // return the map to the clients for rendering
  return g_tileManager;
}

/* Usage : checkforreset(sockid)
    For  : sockId is the client socket connected to the server
    After: sets the reset request of sockid to true 
           if all clients wish to reset the game then the reset will go through */
function checkforreset(sockid) {
  if(GameLobby.handleClientReset(sockid)) {
    g_tileManager.__gameWon.players = false;
    g_tileManager.__gameWon.monster = false;
    g_tileManager.__objPickedUp = 0;
    this.createGameMap();
    GameLobby.resetLobby();
    console.log("Game Reseting!");
  }
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
  checkforreset
};