class Bonus extends GameObject {
    constructor() {
        super();
        this.image = new Image();
        this.takenSound = new Audio();
        this.speed = 1;
        this.defaultMoveFrequency = 20;
        this.cooldown = 10000;
        this.width = 50;
        this.height = 50;
        this.solid = false;
        this.name = "bonus";
        this.vector = "down";
        this.image.src = "img\\bonus\\bonus.png";
        this.takenSound.src = "audio\\bonus_taken.mp3";

    }
    place(x, y) {
        this.x = x;
        this.y = y;
        this.image.onload = () => this.draw();
        this.active = true;
        this.bind();
    }
    activate(taker) {
        this.clearLayer();
        if (this.active) {
            const tempTakenSound = this.takenSound.cloneNode();
            tempTakenSound.volume = 0.1;
            tempTakenSound.play();
            const acceleration = 5;
            taker.vMax += acceleration;
            taker.accelerate(taker.getMainVector(), acceleration);
            setTimeout(() => taker.vMax -= acceleration, 2000);

            this.active = false;
            setTimeout(() => {
                this.draw();
                this.active = true;
            }, this.cooldown);
        }
    }

    reverseEnemies(taker) {

    }


}