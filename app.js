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

/* Differance ? file is f.x client can ask for sprites from server thats express
  client is playing and clicks button thats Input thats socket.io.
  we will use express for sending files the user needs to load the game. 
  sockets are used to gather client inputs and sent out new new game state  */

/* This is the first and only time we will send the client smth and thats our game 
   so he can load it */
app.get('/', (req, res) => { res.sendfile(__dirname+'/client/index.html'); });


/* -----------------------------SOCKET LOGIC START ---------------------------------- */

/* Okay so we will have 2 sockets running for this server
   1- gets inputs from the users every 5 seconds
   2- draws out the board maybe every 40 millisec
   the idea is that we keep drawing out the board 40 millisec and we update the board
   state every 5 seconds, because this is a turn based game, ofc with this type of setup
   if we dont want to have "turn based game" we can just make the 1st socket get inputs 
   much faster from the clients to make a none turn based game ? */
   
  // The "nominal interval" is the one that all of our time-based units are
  // calibrated to e.g. a velocity unit is "pixels per nominal interval"
  let NOMINAL_UPDATE_INTERVAL = 25;
   
  // Dt means "delta time" and is in units of the timer-system (i.e. milliseconds)
  let g_prevUpdateDt = null;

  // Du means "delta u", where u represents time in multiples of our nominal interval
  let g_prevUpdateDu = null;

  // Track odds and evens for diagnostic / illustrative purposes
  let g_isUpdateOdd = false;

  
  function update(dt) {
    // Remember this for later
    var original_dt = dt;
     
    // Warn about very large dt values -- they may lead to error
    if (dt > 200) {
      console.log("Big dt =", dt, ": CLAMPING TO NOMINAL");
      dt = NOMINAL_UPDATE_INTERVAL;
    }
      
    // If using variable time, divide the actual delta by the "nominal" rate,
    // giving us a conveniently scaled "du" to work with.
    var du = (dt / NOMINAL_UPDATE_INTERVAL);
    
    updateSimulation(du); // where our gamelogic update will be at
  
    g_prevUpdateDt = original_dt;
    g_prevUpdateDu = du;
    g_isUpdateOdd = !g_isUpdateOdd;
  }

   // our socket
   io.sockets.on('connect',(socket) => {
     
   });

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
   you can add ur own setting F.X when we push this on heroku it will add its own host and port  */
const {
  PORT: port = 4000,
  HOST: host = '127.0.0.1',
} = process.env;

serv.listen(port, () => { console.info(`Server running at http://${host}:${port}/`); });