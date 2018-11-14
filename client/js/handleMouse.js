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
        return;
    }
    // Checks if we are inside the 0 - 640 pixel range in which our canvas is drawn
    if(insidePlayArea(g_mouseX,g_mouseY)){
        movePlayerTo(roundDown(g_mouseX/64),roundDown(g_mouseY/64));
    };
}


function insidePlayArea(g_mouseX,g_mouseY){
    if((g_mouseX < 640 && g_mouseX > 0) && (g_mouseY < 640 && g_mouseY > 0)) return true;
    else return false;
}