var g_mouseX = 0,
    g_mouseY = 0;

function handleMouse(evt) {
    // Margin added to send perfect middle.
    g_mouseX = evt.clientX - g_canvas.offsetLeft - 30;
    g_mouseY = evt.clientY - g_canvas.offsetTop - 30;
    
    // If no button is being pressed, then bail
    var button = evt.buttons === undefined ? evt.which : evt.buttons;
    if (!button) {
        //Checktile function, here we can hover over something.
        //Then draw the correct grassTileHighlighted if we are over it.
        //
        return;
    }
    drawPlayer(g_mouseX, g_mouseY);
}

// Handle "down" and "move" events the same way.
window.addEventListener("mousedown", handleMouse);
window.addEventListener("mousemove", handleMouse);