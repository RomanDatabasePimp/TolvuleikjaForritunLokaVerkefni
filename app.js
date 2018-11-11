/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

/* this is very important , this is where our server 
   initializes so no game logic code HERE !!!!! */
require('dotenv').config(); // for .env files so we can read them 
const express = require('express'); // used for file communication
const app = express(); 
/* this is abit different from vef2 we need to do this to use sockets  */
const serv = require('http').Server(app);
const io = require('socket.io')(serv,{}); // socket.io package commication

/* ---------------------------------NOTICE---------------------------------
   if there any files you want to send to the user they should be under 
   the /client directory or else kaput 
   ------------------------------------------------------------------------*/
app.use('/client',express.static(__dirname+'/client'));

/* Differance ? f.x, client can ask for sprites from server thats express.
  client is playing and clicks button thats Input thats socket.io.
  we will use express for sending files the user needs to load the game. 
  sockets are used to gather client inputs and sent out new new game states  */

/* This is the first and only time we will send the client smth and thats our game 
   so he can load it */
app.get('/', (req, res) => { 
  res.sendFile(__dirname+'/client/index.html'); 
});

/* -----------------------------SOCKET LOGIC START ---------------------------------- */

  // Fetch the game 
  const FTL = require('./server/FTL');
  FTL.createGameMap(); // need create the initial map before launching the server
 
  // our socket
  io.sockets.on('connect',(socket) => {
    /* if a socket manages to get into our game then we need to keep track of it and 
       poll its input else we dont care what it does maybe later we can add a spectate feature ? */
    if(FTL.tryToJoinGame(socket.id)){ 

      console.log("new player joined !");
      /* its good to define rightaway what should happen if the socket disconects
         so we dont forgget about it, if the player leaves we set its char to null allowing
         a new socket to take over */
      socket.on('disconnect',()=>{
        FTL.leaveGame(socket.id);
        console.log("A player has left !");
      });

      /* We listen to the player if he is ready for the next round  */
      socket.on('clientreadyfornextround',(data)=>{
        if(data) {
          console.log("A player is rdy for the next round");
          FTL.setPlayerReadyForNextRound(socket.id);
        }
      });
    
      /* We listen to the player input */
      socket.on('clientinput',(data)=>{
        /* expect that data will come in a form of 
           { steps : [ step: {x,y}, step:{x,y}, step:{x,y} ] ,
             powerUp: true } */
        FTL.updatePlayer(socket.id,data);
      });
      
    }
  });
  
  

  
  /* Okay basicly this looks abit wierd but stay with me, when the game starts we need to check
     - if all the players have joined the lobby
     - if all joined then we send the game state to  all the clients
     - the clients have to take their time to draw it out and play the animations
       before they can begin the next round (different computers different speeds)
     - if all clients drawed the map out then we can start the next round
     - BUT if a client disconects we need to start from the top again. */
  function gameinit() {
    // fetch a boolean array that tells us if all 3 players are connected to the server
    const allPLayersPLaying = FTL.allPlayersJoined();
    // if all 3 players havent joined or one left we send to the client that we are waiting to for someone
    if(!allPLayersPLaying.alljoined) {
      io.sockets.emit('NextGameRound', { hasnotgamestarted : allPLayersPLaying.hasnotgamestarted });
      // if the lobby is not full we try again in 3 seconds
      console.log("Waiting for lobby full (tryin in 3 sec) ");
      setTimeout(gameinit, 3000);
      return;
    }
    // update the map and send it to the clients 
    io.sockets.emit('NextGameRound', FTL.updateStateAndReturn());
    // try to start the next round
    startRound();
  }

  /* the next round is only going to start if all players are ready. the problem here is 
     if we would combine these to functions we would essentially not know when to send the map 
     to the clients. if we send the map to soon we would be stuck at rerendering the maps client side
     we would never start the next round , to late the map would not be sent we could not start next round*/
  function startRound() {
    // still need to check if the player disconected to be safe
    const allPLayersPLaying = FTL.allPlayersJoined();
    // if all 3 players havent joined or one left we send to the client that we are waiting to for someone
    if(!allPLayersPLaying.alljoined) {
      io.sockets.emit('NextGameRound', { hasnotgamestarted : allPLayersPLaying.hasnotgamestarted });
      // if the lobby is not full we try again in 3 seconds
      console.log("Waiting for lobby full (tryin in 3 sec) ");
      // go back to the start to be safe to ensure all clients are in the same state
      setTimeout(gameinit, 3000);
      return;
    }

    // if clients are not ready for the next class we wait
    if(!FTL.allPlayersReadyForNextRound()) {
      console.log("Waiting for all clients to start next round (trying in 3 sec)");
      setTimeout(startRound,3000);
      return;
    }

    // tells client they have 5 seconds to make a move
    io.sockets.emit('roundstart', null );

    // unready the players since they are finishing the current round
    FTL.setPlayerNotReadyForNextRound();

    // wait 6 seconds before updateting the map state and sending it back
    console.log("Players making move trying updating state in 6 sec");
    setTimeout(gameinit,6000);
  }

/* -----------------------------SOCKET LOGIC END ------------------------------------ */

/* Just common practice to make these not found and server crash handlers we wont use them */
function notFoundHandler(req, res, next) { res.status(404).json({ error: 'Not found' }); }

function errorHandler(err, req, res, next) {
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}

// we are telling our Server here to use them
app.use(notFoundHandler);
app.use(errorHandler);

/* Setting to initialize the server if ur are using somekind of env config
   you can add ur own settings F.X when we push this on heroku it will add its own host and port  */
const {
  PORT: port = 4000,
  HOST: host = '127.0.0.1',
} = process.env;

serv.listen(port, () => {gameinit(); console.info(`Server running at http://${host}:${port}/`); });