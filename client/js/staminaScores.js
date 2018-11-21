function setStamina(player){
    let playername = player.character;
    const playerStamina = player.stamina;
    let rightPlayerName = "";
    // Put the head image on the right spot
    switch(playername) {
        case playername = "bob":
        rightPlayerName = "Bob"
        document.getElementById("playerHeads").src = './client/img/Player/Heads/playerFace.png';
        if(player.powerup == "redbull"){
          document.getElementById("powerUpHeads").src = './client/img/keys/platformPack_item003.png';
        } else {
          document.getElementById("powerUpHeads").src = '';
        }
        break;
        case playername = "sara":
        rightPlayerName = "Sara"
        document.getElementById("playerHeads").src =  './client/img/Player/Heads/saraFace.png';
        if(player.powerup == "redbull"){
          document.getElementById("powerUpHeads").src = './client/img/keys/platformPack_item003.png';
        } else {
          document.getElementById("powerUpHeads").src = '';
        }
        break;
        case playername = "monster":
        rightPlayerName = "Monster"
        document.getElementById("playerHeads").src =  './client/img/Monster/platformChar_happy.png';
        if(player.powerup == "redbull"){
         document.getElementById("powerUpHeads").src = './client/img/keys/platformPack_item003.png';
        } else {
          document.getElementById("powerUpHeads").src = '';
        }
        break;
        default: 
    }
    // Hér þyrfti að skoða hvort að character væri kominn með powerUp og þá setja það í sidaBar
    // else display none

    const headerString = playerStamina;
    document.getElementById("headTitle").innerHTML = headerString;
}
