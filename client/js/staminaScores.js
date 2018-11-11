function setStamina(player){
    let playername = player.character;
    const playerStamina = player.stamina;
    let rightPlayerName = "";
    // Put the head image on the right spot
    switch(playername) {
        case playername = "bob":
        rightPlayerName = "Bob"
        document.getElementById("playerHeads").src =  './client/img/Player/Heads/playerFace.png';
        break;
        case playername = "sara":
        rightPlayerName = "Sara"
        document.getElementById("playerHeads").src =  './client/img/Player/Heads/saraFace.png';
        break;
        case playername = "monster":
        rightPlayerName = "Monster"
        document.getElementById("playerHeads").src =  './client/img/Player/Heads/monsterFace.png';
        break;
        default: 
    }
    const headerString = playerStamina;
    document.getElementById("headTitle").innerHTML = headerString;
}
