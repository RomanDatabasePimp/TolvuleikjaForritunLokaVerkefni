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

/* Okay basicly our socket will pull the user data from the clients and when it has
   pulled all 3 clients it will update the game state and send the next state to the 
   clients where they have again 5 seconds to make a move  */

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
    }
  });

  setInterval(function() {
    // start by checking if all players are playing
    const allPLayersPLaying = FTL.allPlayersJoined();
    // if all 3 players havent joined or one left we send to the client that we are waiting to for someone
    if(!allPLayersPLaying.alljoined) { 
      io.sockets.emit('NextGameRound', { hasnotgamestarted : allPLayersPLaying.hasnotgamestarted });
      return;
    }
    io.sockets.emit('NextGameRound', FTL.updateStateAndReturn());
  }, 5000);


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

serv.listen(port, () => { console.info(`Server running at http://${host}:${port}/`); });