var victory = new Audio('./client/audios/victory.mp3');
function victorySound(){
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
