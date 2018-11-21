// Initialise the victory sound
var victory = new Audio('./client/audios/victory.mp3');
// function the shows the winner form and stops the bakgroundMusic. After foing that it activates the victory sound
// and the victory sound is playing for 8 seconds.
function victorySound(){
    document.getElementById('fireWorksContainerID').style.display = '';
    document.getElementById("winnerNoteID").style.display='';
    backgroundMusic.pause();
    victory.play();
    setTimeout(function(){ endWinner(); }, 8000);
    
}
// When 8 seconds have passed from the activations of victorySound. The setTimeour is finished and calles the endWinner. 
//Here we stop the victory sound and replay the background music.
// Finally we display none on the winnerForm and the game starts again.
function endWinner(){
    document.getElementById('fireWorksContainerID').style.display = 'none';
    document.getElementById("winnerNoteID").style.display = 'none';
    amIalive = true;
    socket.emit("resetgamerequest",null);
    backgroundMusic.play();
}
