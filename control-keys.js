const arrowControls = {
    "left": 0,
    "right": 0,
    "move": 0,
    "shoot": 0
}
const awsdControls = {
    "left": 0,
    "right": 0,
    "move": 0,
    "shoot": 0
}

function keyHandler(event, boolValue) {
    switch (event.keyCode) {
        // arrow controls
        case 37:
            arrowControls.left = boolValue;
            break;
        case 39:
            arrowControls.right = boolValue;
            break;
        case 38:
            arrowControls.move = boolValue;
            break;
        case 32:
            arrowControls.shoot = boolValue;
            break;
            // awsd controls
        case 65:
            awsdControls.left = boolValue;
            break;
        case 68:
            awsdControls.right = boolValue;
            break;
        case 87:
            awsdControls.move = boolValue;
            break;
        case 84:
            awsdControls.shoot = boolValue;
            break;
    }
}

function keyUpHandler(event) {
    keyHandler(event, false);
}

function KeyDownHandler(event) {
    keyHandler(event, true);
}