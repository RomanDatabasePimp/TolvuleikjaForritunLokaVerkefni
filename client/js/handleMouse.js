var g_mouseX = 0,
    g_mouseY = 0;
    

function handleMouse(evt) {
    // Margin added to send perfect middle.
    g_mouseX = evt.clientX - g_canvas.offsetLeft;
    g_mouseY = evt.clientY - g_canvas.offsetTop;
    
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) {
        //Checktile function, here we can hover over something.
        //Then draw the correct grassTileHighlighted if we are over it.
        //
        if(insidePlayArea(g_mouseX,g_mouseY)){
            showPlayerMoves(g_mouseX,g_mouseY);
        };
        return;
    }
    if(insidePlayArea(g_mouseX,g_mouseY)){
        movePlayerTo(g_mouseX,g_mouseY);
    };
}
// Get a player to know its stamina/where it can move
// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);

function insidePlayArea(g_mouseX,g_mouseY){
    if((g_mouseX < 640 && g_mouseX > 0) && (g_mouseY < 640 && g_mouseY > 0)) return true;
    else return false;
}