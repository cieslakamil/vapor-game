const arrowControls = {
    "left": 0,
    "right": 0,
    "up": 0,
    "down": 0,
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        arrowControls.right = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        arrowControls.left = false;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        arrowControls.up = false;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        arrowControls.down = false;
    }
}

function KeyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        arrowControls.right = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        arrowControls.left = true;
    }
    if (e.key == "Up" || e.key == "ArrowUp") {
        arrowControls.up = true;
    } else if (e.key == "Down" || e.key == "ArrowDown") {
        arrowControls.down = true;
    }
}