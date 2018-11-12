var victory = new Audio('./client/audios/victory.mp3');
function victorySound(){
    document.getElementById('fireWorksContainerID').style.display = '';
    console.log("kominn í winner");
    victory.play();
    
}