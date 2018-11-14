var victory = new Audio('./client/audios/victory.mp3');
function victorySound(){
<<<<<<< HEAD
    document.getElementById('fireWorksContainerID').style.display = '';
    document.getElementById("winnerNoteID").style.display='';
    console.log("kominn í winner");
    victory.play();
    setTimeout(function(){ endWinner(); }, 8000);
    
}
function endWinner(){
    document.getElementById('fireWorksContainerID').style.display = 'none';
    document.getElementById("winnerNoteID").style.display = 'none';
}
=======
    document.getElementById("winnerNoteID").style.display = '';
    document.getElementById("fireWorksContainerID").style.display = '';
    victory.play();
    console.log("kominn í winner");
    setTimeout(function(){ endVictorySound()}, 11000);
    // Hér þarf að búa til element sem segir hver vann og svona   
}
function endVictorySound() {
    document.getElementById("winnerNoteID").style.display = 'none';
    document.getElementById("fireWorksContainerID").style.display = 'none';
}
>>>>>>> b1bfecae4d8b6f9ab641a5281681923400b28a7b
