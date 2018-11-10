// Upphafstilla alla playera sem waiting
let player1 = "Bob is waiting";
let player2 = "Sara is waiting";
let monster = "Monster is waiting";
let playerOne;
let playerTwo;
let playerThree;
// Kalla á fall sem upphafstillir playerana eftir því hvort þeir eru ready eða waiting. Tek inn booolean fylki
let video;// er childid sem er video
let main;// er parent sem er body
let first = true;
function allPlayerReady(data){
  player1 = "Bob is waiting";
  player2 = "Sara is waiting";
  monster = "Monster is waiting";
  if(data.hasOwnProperty("hasnotgamestarted"))
  {  
    if(data.hasnotgamestarted[0] == true){player1 = "Bob is ready to roll";}
    if(data.hasnotgamestarted[1] == true){player2 = "Sara will kick your ass"}
    if(data.hasnotgamestarted[2] == true){monster= "The monster will eat all of you";}
    // þarf aðs setja try og catch tiol þess að htmlid fyllist ekki 
    try {
      playerContainer.remove();
    }catch{}
    drawFirstView();
    drawPlayers();
    video.remove();
    first = true;
  }else{
    try{video.remove()}catch{}
      drawGameBackground();
    // hér þarf að gera bakgrun sem er í gangi á meðan leikinum stendur.

  }
}

function drawGameBackground() {
  if(first == true){
    
      main = document.querySelector('body');
      backVideo = appendChild(main, 'video', 'backgroundvideo');
      backVideo.setAttribute('src','/client/videos/frontPic.mp4')
      backVideo.setAttribute('autoplay','')
      first = false;
  }
}

function drawFirstView() {
    /*  Get the location of main in HTML  */
    main = document.querySelector('body');
    video = appendChild(main, 'video', 'myVideo');
    video.setAttribute('src','/client/videos/frontPic.mp4')
    video.setAttribute('autoplay','')
}
function createElement(element, className = '') {
    const div = document.createElement(element);
    div.setAttribute('class', className);
    return div;
  }
  function appendChild(node, elementType, className = '') {
    const div = document.createElement(elementType);
    div.setAttribute('class', className);
    return node.appendChild(div);
  }
  function addTextToNode(node, text) {
    node.appendChild(document.createTextNode(text));
  }
  function drawPlayers(){
    playerContainer = appendChild(main,'div','container');
    playerOne = appendChild(playerContainer,'div','players');
    playerOne.setAttribute('id','one');
    addTextToNode(playerOne,player1);
    playerTwo = appendChild(playerContainer,'div','players');
    playerTwo.setAttribute('id','two');
    addTextToNode(playerTwo,player2);
    playerThree = appendChild(playerContainer,'div','players');
    playerThree.setAttribute('id','three');
    addTextToNode(playerThree,monster);
  }
  function playerReady(){
    player1 = "Player one is ready";
    playerOne.remove();
    playerTwo.remove();
    playerThree.remove();
    drawPlayers();
  }

