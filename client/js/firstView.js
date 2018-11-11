// Upphafstilla alla playera sem waiting
let player1 = "Bob is ready to roll";
let player2 = "Sara is waiting";
let monster = "Monster is waiting";
let playerOne;
let playerTwo;
let playerThree;
let Container;
// Kalla á fall sem upphafstillir playerana eftir því hvort þeir eru ready eða waiting. Tek inn booolean fylki
let video;// er childid sem er video
let main;// er parent sem er body
function allPlayerReady(data){
  player1 = "Bob is ready to roll";
  player2 = "Sara is waiting";
  monster = "Monster is waiting";
  if(data.hasOwnProperty("hasnotgamestarted"))
  {  
    
    console.log("ég er að teikna playera")
    if(data.hasnotgamestarted[0] == true){player1 = "Bob is ready to roll";}
    if(data.hasnotgamestarted[1] == true){player2 = "Sara will kick your ass"}
    if(data.hasnotgamestarted[2] == true){monster= "The monster will eat all of you";}
    drawPlayers();
    // þarf aðs setja try og catch tiol þess að htmlid fyllist ekki 
  }else{
    document.getElementById('videoContainerinn').style.display = 'none';
    console.log("Game has started");
  }
}
  function drawPlayers(){
    console.log("drawing");
    let first = document.getElementById('one');
    first.innerHTML = player1;
    let second = document.getElementById('two');
    second.innerHTML = player2;
    let third = document.getElementById('three');
    third.innerHTML = monster;
  }

