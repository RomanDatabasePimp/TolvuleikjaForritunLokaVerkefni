/**
 * Our handlers for key inputs.
 */
var keys = [];

let KEY_UP = 'W'.charCodeAt(0);
let KEY_DOWN  = 'S'.charCodeAt(0);
let KEY_LEFT   = 'A'.charCodeAt(0);
let KEY_RIGHT  = 'D'.charCodeAt(0);

function handleKeydown(evt) {
    keys[evt.keyCode] = true;
    //TODO þegar keyrsla kemur, sjá hvort við erum á x/y ásnum.
}

function handleKeyup(evt) {
    keys[evt.keyCode] = false;
}

function eatKey(keyCode) {
    var isDown = keys[keyCode];
    keys[keyCode] = false;
    return isDown;
}

// A tiny little convenience function
function keyCode(keyChar) {
    return keyChar.charCodeAt(0);
}
