const arrowControls = {
    "left": 0,
    "right": 0,
    "up": 0,
    "down": 0,
    "space": 0
}

function keyUpHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        arrowControls.right = false;
    }
    if (event.key == "Left" || event.key == "ArrowLeft") {
        arrowControls.left = false;
    }
    if (event.key == "Up" || event.key == "ArrowUp") {
        arrowControls.up = false;
    }
    if (event.key == "Down" || event.key == "ArrowDown") {
        arrowControls.down = false;
    }
    if (event.keyCode == 32) {
        arrowControls.space = false;
    }
}

function KeyDownHandler(event) {
    if (event.key == "Right" || event.key == "ArrowRight") {
        arrowControls.right = true;
    }
    if (event.key == "Left" || event.key == "ArrowLeft") {
        arrowControls.left = true;
    }
    if (event.key == "Up" || event.key == "ArrowUp") {
        arrowControls.up = true;
    }
    if (event.key == "Down" || event.key == "ArrowDown") {
        arrowControls.down = true;
    }
    if (event.keyCode == 32) {
        arrowControls.space = true;
    }
}