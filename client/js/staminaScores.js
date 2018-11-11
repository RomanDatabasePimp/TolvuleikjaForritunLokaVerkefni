function setStamina(player){
    const playername = player.character;
    const playerStamina = player.stamina;
    const headerString = playername+ " your stamina is "+ playerStamina;
    document.getElementById("headTitle").innerHTML = headerString;
}