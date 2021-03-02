//CHANGE CLASS NAME
class Vapor extends GameObject {
    constructor() {
        super();
        this.alive = false;
        this.immune = true;
        this.name = "player";
        this.width = 60;
        this.height = 60;
        this.solid = true;
        this.vMax = 8; //CHANGE NAME
        this.speed = 0;
        this.startingHealthPoints = 15;
        this.startingBulletAmount = 15;
        this.defaultMoveFrequency = 20;
        this.slowDownFrequency = 10;
        this.shootingCooldown = 250;
        this.intervals = new Array();
        this.directions = ["left", "right", "up", "down"];
        this.reloadCooldown = 3000;
        //images
        this.images = new Array();
        this.images.base = new Image();
        this.images.sad = new Image();
        //audio
        //CHANGE NAMES
        this.loadHealthSound = new Audio();
        this.loadHealthSound.src = "audio\\load_health1.mp3";
        this.healthLoadedSound = new Audio();
        this.healthLoadedSound.src = "audio\\health_loaded.mp3";

        this.shootSound = new Audio();
        this.shootSound.src = "audio\\shoot_start.mp3";
        this.getShotSound = new Audio();
        this.getShotSound.src = "audio\\shot.mp3";


        //bullets
        this.bullestStack = new Array(10);
        this.bulletPtr = 0;


    }
    awaitLaunch() {
        document.addEventListener("keydown", (event) => {
            if (event.key == this.launchingKey && (!this.alive)) this.launch()
        }, false);
    }
    launch() {
        this.alive = true;
        this.x = this.startingX;
        this.y = this.startingY;
        this.accelerating = false;
        this.speed = { "left": 0, "right": 0, "up": 0, "down": 0 };

        clearInterval(this.deathInterval);
        for (const vector in this.directions)
            this.intervals.push(setInterval(() => this.move(this.directions[vector]), this.defaultMoveFrequency));
        this.intervals.push(setInterval(() => { if (!this.accelerating) this.slowDown() }, this.slowDownFrequency));
        this.intervals.push(setInterval(() => this.catchMove(), 10));
        this.intervals.push(setInterval(() => { if (this.controls.attack) this.shoot() }));

        this.currentBulletAmount = this.startingBulletAmount;
        this.loadBullets(100);
        this.bulletAvailable = true;

        this.currentHealthPoints = this.startingHealthPoints;
        this.loadHealth(100).then(() => {
            this.image = this.images.base;
            this.draw()
            this.bind();
            this.immune = false;
            this.moveable = true;
        })
    }
    loadBullets(loadingFrequency) {
        this.htmlBulletString = "";
        let i = 0;
        const loadingBullet = setInterval(() => {
            this.htmlBulletString += 'I';
            this.htmlBullet.innerHTML = this.htmlBulletString;

            if (++i == this.currentBulletAmount) {
                clearInterval(loadingBullet);
            }
        }, loadingFrequency);

        for (let i = 0, bullet; i < this.bullestStack.length; i++) {
            this.bullestStack[i] = new Bullet(this);
            bullet = this.bullestStack[i];
            bullet.image = new Image();
            bullet.image.src = "img\\bullet\\bullet_" + this.color + ".png";
            bullet.canvas.style.zIndex = this.canvas.style.zIndex + 1; //CHECK IT, CAN IT BE IN CONSTRUCTOR?


        }
    }
    draw() {
        if (this.image.complete) super.draw();
        else this.image.onload = () => super.draw();
    }
    showHealthPoints() {
        let htmlHealthString = "";
        for (let i = 0; i < this.currentHealthPoints; i++)
            htmlHealthString += 'I';
        this.htmlHealth.innerHTML = htmlHealthString;
    }
    showBulletAmount() {
        let htmlBulletString = "";
        for (let i = 0; i < this.currentBulletAmount; i++)
            htmlBulletString += 'I';
        this.htmlBullet.innerHTML = htmlBulletString;
    }
    die() {
        for (let i = 0; i < this.intervals.length; i++)
            clearInterval(this.intervals[i]);
        this.currentBulletAmount = 0;
        this.showBulletAmount();
        this.unbind();
        this.alive = false;
        this.deathInterval = setInterval(() => this.clearLayer(), 1);
    }


    loadHealth(loadingFrequency) {
        return new Promise((callback) => {
            this.htmlHealthString = "";
            let i = 0;
            this.loadHealthSound.cloneNode().play();
            const loadingHealth = setInterval(() => {
                this.htmlHealthString += 'I';
                this.htmlHealth.innerHTML = this.htmlHealthString;

                if (++i == this.currentHealthPoints) {
                    clearInterval(loadingHealth);
                    callback();
                }
            }, loadingFrequency);
        })
    }

    //MOVE FUNCTIONS
    catchMove() {
        for (const direction in this.controls)
            if (this.controls[direction] && !(direction == "attack" || direction == "power"))
                if (this.moveable) {
                    this.accelerate(this.vector = direction);
                }
    }
    move(vector) {
        if (this.speed[vector] > 0) {
            const scanList = ["player", "bonus", "mapObject"]
            const scannedObject = this.scan(vector, scanList);
            if (scannedObject == null) super.move(vector);
            else switch (scannedObject.name) {
                case "player":
                    this.collide(scannedObject);
                    break;
                case "bonus":
                    scannedObject.activate(this);
                default:
                    if (scannedObject.solid) {
                        this.draw(this.rotation);
                        this.speed[vector] = 0;
                    } else super.move(vector);
            }
        }
    }
    accelerate(vector, acceleration = 2) {
        const scanList = ["player", "mapObject"];
        const scanResult = this.scan(vector, scanList);
        if (scanResult == null || scanResult.name != "mapObject") {
            this.accelerating = true;
            //THINK BEFORE CHANGING
            switch (vector) {
                case "left":
                    if (this.speed.right > 0) this.speed.right -= acceleration;
                    break;
                case "right":
                    if (this.speed.left > 0) this.speed.left -= acceleration;
                    break;
                case "up":
                    if (this.speed.down > 0) this.speed.down -= acceleration;
                    break;
                case "down":
                    if (this.speed.up > 0) this.speed.up -= acceleration;
                    break;
            }
            if (this.speed[vector] < this.vMax)
                this.speed[vector] += acceleration;
            this.accelerating = false;
        }
    }
    stopSpeed(direction) {
        this.speed[direction] = 0;
    }
    slowDown() {
        for (const vector in this.speed)
            if (this.speed[vector] > 0)
                if (this.speed[vector] > 4) this.speed[vector] -= 1;
                else this.speed[vector] -= 1;
    }

    collide(hitPlayer) {}

    getMainVector() {
            let mainVector = null;
            let highestSpeed = 0;
            for (const vector in this.directions)
                if (this.speed[vector] > highestSpeed) {
                    mainVector = vector;
                    highestSpeed = this.speed[vector];
                }
            return mainVector;
        }
        //SHOOTING FUNCTIONS
    shoot() {


        if (this.bulletAvailable && this.currentBulletAmount > 0) {
            clearTimeout(this.reloadThread);
            clearInterval(this.loadingBullet);
            this.bulletAvailable = false;
            setTimeout(() => this.bulletAvailable = true, this.shootingCooldown);
            this.bullestStack[this.bulletPtr].fire();
            this.shootSound.cloneNode().play();

            if (this.currentBulletAmount > 0)
                this.currentBulletAmount--;
            this.showBulletAmount();

            if (this.bulletPtr == this.bullestStack.length - 1)
                this.bulletPtr = 0;
            else this.bulletPtr++;

            this.reloadThread = setTimeout(() => this.reloadBullets(), this.reloadCooldown);
        }
    }
    reloadBullets() {
        this.htmlBulletString = "";
        for (let i = 0; i < this.currentBulletAmount; i++) {
            this.htmlBulletString += "I";
        }
        let i = this.currentBulletAmount;
        this.loadingBullet = setInterval(() => {
            this.htmlBulletString += 'I';
            this.htmlBullet.innerHTML = this.htmlBulletString;
            this.currentBulletAmount++;
            if (++i == this.startingBulletAmount) {
                clearInterval(this.loadingBullet);
            }
        }, 100); //THIS IS LOADING FREQUENCY, DELETE MAGIC NUM

    }
    getShot() {
        this.getShotSound.cloneNode().play();
        this.animateGetShot(150);
        if (!this.immune) {
            --this.currentHealthPoints;
            this.showHealthPoints();
            if (this.currentHealthPoints == 0) this.die();
        }
    }
    animateGetShot(duration) {
        //this.bullestStack[0].shotSound.cloneNode().play();
        this.image = this.images.sad;
        this.clearLayer();
        this.draw();
        setTimeout(() => {
            this.image = this.images.base;
            super.draw();
        }, duration);
    }
}