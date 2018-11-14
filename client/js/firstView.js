// Upphafstilla alla playera sem waiting
let player1 = "Waiting for Bob";
let player2 = "Waiting for Sara";
let monster = "Waiting for monster";
let playerOne;
let playerTwo;
let playerThree;
let Container;
// Kalla á fall sem upphafstillir playerana eftir því hvort þeir eru ready eða waiting. Tek inn booolean fylki
let video;// er childid sem er video
let main;// er parent sem er body
function allPlayerWaiting(data){
  player1 = "Waiting for Bob";
  player2 = "Waiting for Sara";
  monster = "Waiting for monster";
   
    if(data != []){  
        document.getElementById('videoContainerinn').style.display = '';
        document.getElementById('fireWorksContainerID').style.display = 'none';
      /*  if(data.hasnotgamestarted[0] == true){player1 = "Bob is ready to roll";}
        if(data.hasnotgamestarted[1] == true){player2 = "Sara will kick your ass"}
        if(data.hasnotgamestarted[2] == true){monster= "The monster will eat all of you";}*/
        drawPlayers();
    }
    document.getElementById('videoContainerinn').style.display = 'none';
    /*else{
      document.getElementById('videoContainerinn').style.display = 'none';
      document.getElementById('myVideoBackground').style.display='none';
    }
    */
    
    // þarf aðs setja try og catch tiol þess að htmlid fyllist ekki 
 /*
    Þegar leikur er í gangi
   
  */
}
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

