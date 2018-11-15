function setStamina(player){
    let playername = "bob";//player.character;
    const playerStamina = 10;//player.stamina;
    let rightPlayerName = "";
    // Put the head image on the right spot
    switch(playername) {
        case playername = "bob":
        rightPlayerName = "Bob"
        document.getElementById("playerHeads").src = './client/img/Player/Heads/playerFace.png';
        break;
        case playername = "sara":
        rightPlayerName = "Sara"
        document.getElementById("playerHeads").src =  './client/img/Player/Heads/saraFace.png';
        break;
        case playername = "monster":
        rightPlayerName = "Monster"
        document.getElementById("playerHeads").src =  './client/img/Monster/platformChar_happy.png';
        break;
        default: 
    }
    // Hér þyrfti að skoða hvort að character væri kominn með powerUp og þá setja það í sidaBar
    // else display none
    document.getElementById("powerUpHeads").src = './client/img/keys/platformPack_item003.png';
    const headerString = playerStamina;
    document.getElementById("headTitle").innerHTML = headerString;
}
