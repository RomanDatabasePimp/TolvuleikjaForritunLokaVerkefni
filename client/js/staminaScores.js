function setStamina(player){
    //let playername = player.character;
    //const playerStamina = player.stamina;
    playername = "bob";
    let rightPlayerName = "";
    rightPlayerName = "bob";
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
        document.getElementById("playerHeads").src =  './client/img/Monster/platformChar_happy.png';
        break;
        default: 
    }
    console.log(playername);
    const headerString = 10;//playerStamina;
    document.getElementById("headTitle").innerHTML = headerString;
}
