// Global variables
// Creating all of the player they are all initialised as waiting
let player1 = "Waiting for Bob";
let player2 = "Waiting for Sara";
let monster = "Waiting for monster";
let playerOne;
let playerTwo;
let playerThree;
let Container;
var backgroundMusic = new Audio('./client/audios/background.mp3');
// Function that will update the waiting looby, in regards for the players. Only when all of the players are ready the waiting loopy displays none 
// and the game begins.
let video;// child and it is the video
let main;// parent and it is the body
function allPlayerWaiting(data, flag){
  try{
    backgroundMusic.play();
  }catch{
    
  }
  player1 = "Waiting for Bob";
  player2 = "Waiting for Sara";
  monster = "Waiting for monster";
  document.getElementById("gameRules").style.display = "none";
    if(data != {}){
        try{
          document.getElementById('videoContainerinn').style.display = '';
          document.getElementById('fireWorksContainerID').style.display = 'none';
          if(data.hasnotgamestarted[0] == true){player1 = "Bob is ready to roll";}
          if(data.hasnotgamestarted[1] == true){player2 = "Sara will kick your ass"}
          if(data.hasnotgamestarted[2] == true){monster= "The monster will eat all of you";}
          drawPlayers();
        }catch{
          document.getElementById('videoContainerinn').style.display = 'none';
          document.getElementById('myVideoBackground').style.display='none';
        }
    }
}
// This function keeps the waiting loopy froma appearing and activates the background.
    function gamePlaying(){
      document.getElementById('videoContainerinn').style.display = 'none';
      document.getElementById('myVideoBackground').style.display='';
      document.getElementById("gameRules").style.display = "";
    }
// Draws all of the players messages on the waiting looby.
function drawPlayers(){
  document.getElementById("winnerNoteID").style.display = 'none';
  document.getElementById('fireWorksContainerID').style.display = 'none';
  document.getElementById('myVideoBackground').style.display='none';
  let first = document.getElementById('one');
  first.innerHTML = player1;
  let second = document.getElementById('two');
  second.innerHTML = player2;
  let third = document.getElementById('three');
  third.innerHTML = monster;
}

