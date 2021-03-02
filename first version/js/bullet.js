class Bullet extends GameObject {
    constructor(owner, size = 10, speed = 15, motionFrequency = 18, cooldown = 250) {
        super();
        this.owner = owner;
        this.width = size;
        this.height = size;
        this.speed = speed;
        this.motionFrequency = motionFrequency;
        this.speed = { left: speed, right: speed, up: speed, down: speed };

        this.cooldown = cooldown; // MOVE TO VAPOR
        // ADJUST SOUND VOLUME
        //this.shotSound = new Audio();
        //this.shotSound.src = "audio\\shot.mp3"
        //this.shotSoundStart = new Audio();
        //this.shotSoundStart.src = "audio\\shoot_start.mp3";
    }
    fire() {
        //placing bullet in the center of champion
        this.x = this.owner.x + this.owner.width / 2 - this.width / 2;
        this.y = this.owner.y + this.owner.height / 2 - this.height / 2;
        this.vector = this.owner.vector;
        //this.shotSoundStart.cloneNode().play();
        const centerDistance = 10;
        switch (this.vector) {
            case "left":
                this.x -= centerDistance;
                break;
            case "right":
                this.x += centerDistance;
                break;
            case "up":
                this.y -= centerDistance;
                break;
            case "down":
                this.y += centerDistance;
                break;
        }
        let scanResult;
        let rotateDegree = 0;

        const cyclePI = Math.PI / 32;
        const shooting = setInterval(() => {
            const scanList = ["player", "mapObject", ]
            scanResult = this.scan(this.vector, scanList)
            if (scanResult == null || scanResult == this.owner) {
                this.move();
                this.draw(rotateDegree);
                rotateDegree += cyclePI;
            } else {
                switch (scanResult.name) {
                    case "player":
                        //if (scanResult.team != this.owner.team) {
                        scanResult.getShot();
                        break;
                        // }
                }
                this.unbind();
                this.clearLayer();
                clearInterval(shooting);
            }
        }, this.motionFrequency);
    }


}