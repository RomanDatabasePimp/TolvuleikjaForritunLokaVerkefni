var victory = new Audio('./client/audios/victory.mp3');
function victorySound(){
    document.getElementById('fireWorksContainerID').style.display = '';
    document.getElementById("winnerNoteID").style.display='';
    console.log("kominn í winner");
    backgroundMusic.pause();
    victory.play();
    setTimeout(function(){ endWinner(); }, 8000);
    
}
function endWinner(){
    document.getElementById('fireWorksContainerID').style.display = 'none';
    document.getElementById("winnerNoteID").style.display = 'none';
    socket.emit("resetgamerequest",null);
    backgroundMusic.play();
}
