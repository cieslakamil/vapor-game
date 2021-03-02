const arrowControls = { "left": 0, "right": 0, "up": 0, "down": 0, "attack": false, "power": false }
const wasdControls = { "left": 0, "right": 0, "up": 0, "down": 0, "attack": false, "power": false }
const secondControls = { "left": 0, "right": 0, "up": 0, "down": 0, "attack": false, "power": false }
const thirdControls = { "left": 0, "right": 0, "up": 0, "down": 0, "attack": false, "power": false }

//CHANGE NAME OF CONTROLS
function keyHandler(e, boolValue) {
    //ARROWS
    if (e.key == "Right" || e.key == "ArrowRight") {
        arrowControls.right = boolValue;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        arrowControls.left = boolValue;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        arrowControls.up = boolValue;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        arrowControls.down = boolValue;
    }
    if (e.keyCode == 75)
        arrowControls.attack = boolValue;

    //WASD
    if (e.key.toLowerCase() == 'w')
        wasdControls.up = boolValue;
    else if (e.key.toLowerCase() == 's')
        wasdControls.down = boolValue;
    if (e.key.toLowerCase() == 'a')
        wasdControls.left = boolValue;
    else if (e.key.toLowerCase() == 'd')
        wasdControls.right = boolValue;
    if (e.keyCode == 82)
        wasdControls.attack = boolValue;
    //second
    if (e.keyCode == 84)
        secondControls.up = boolValue;
    else if (e.keyCode == 71)
        secondControls.down = boolValue;
    if (e.keyCode == 70)
        secondControls.left = boolValue;
    else if (e.keyCode == 72)
        secondControls.right = boolValue;
    if (e.keyCode == 85)
        secondControls.attack = boolValue;
    //third
    if (e.keyCode == 80)
        thirdControls.up = boolValue;
    else if (e.keyCode == 186)
        thirdControls.down = boolValue;
    if (e.keyCode == 76)
        thirdControls.left = boolValue;
    else if (e.keyCode == 222)
        thirdControls.right = boolValue;
    if (e.keyCode == 221)
        thirdControls.attack = boolValue;

}

function keyDownHandler(e) {
    keyHandler(e, true);
}

function keyUpHandler(e) {
    keyHandler(e, false);
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);