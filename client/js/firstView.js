// Upphafstilla alla playera sem waiting
let player1 = "Player one waiting";
let player2 = "Player two waiting";
let monster = "Player three waiting";
let video;// er childid sem er video
let main;// er parent sem er body
function draw() {
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
    playerOne = appendChild(main,'div','players');
    playerOne.setAttribute('id','one');
    console.log(player1);
    addTextToNode(playerOne,player1);
    playerTwo = appendChild(main,'div','players');
    playerTwo.setAttribute('id','two');
    addTextToNode(playerTwo,player2);
    playerThree = appendChild(main,'div','players');
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
  draw();
  drawPlayers();
  
  setInterval(function(){
    draw()
    video.remove();
  }, 60000);

