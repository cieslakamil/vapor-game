class GameHero extends GameObject {
    constructor(x, y, width, height, controlKeys) {
        super(x, y, width, height);
        // moving physics
        this.controlKeys = controlKeys;
        this.speed = 20;
        this.steeringAngle = 11;
        // collision physics
        this.radius = 25;
        this.walls = {};
        // shooting properties
        this.bulletProperties = {
            width: 15,
            height: 15,
            imageSrc: "bullet-green.png",
            imageName: "greenBullet",
            cooldown: 300,
            speed: 50,
            frameUpdateFrequency: 20
        }
        this.bulletsCount = 20;
        this.bullets = this.prepareBullets(this.bulletsCount);
        this.currentBulletNumber = 0;
        this.ableToShoot = true;
    }
    catchPlayerAction() {
        if (arrowControls['left']) {
            this.moveAngle(this.steeringAngle * (-1));
        }
        if (arrowControls['right']) {
            this.moveAngle(this.steeringAngle);
        }
        if (arrowControls['up']) {
            this.move();
        }
        if (arrowControls['space']) {
            if (this.ableToShoot) {
                this.shoot();
                //this.setShootCooldown();
            }
        }
    }
    move() {
        const speedX = this.speed * Math.sin(this.angle);
        const speedY = this.speed * Math.cos(this.angle);
        // if there is no collision with vertical walls,
        // move on x-axis
        if (this.xCor + speedX > this.walls['left'] && this.xCor + speedX < this.walls['right']) {
            this.xCor += speedX;
        }
        // if there is no collision with horizontal walls,
        // move on y-axis
        if (this.yCor - speedY > this.walls['top'] && this.yCor - speedY < this.walls['bottom']) {
            this.yCor -= speedY;
        }
    }
    setWalls(left, right, top, bottom) {
            this.walls['left'] = left + this.radius;
            this.walls['right'] = right - this.radius;
            this.walls['top'] = top + this.radius;
            this.walls['bottom'] = bottom - this.radius;
        }
        // Shooting functions
    shoot() {
        const bullet = this.getBullet();
        bullet.xCor = this.xCor;
        bullet.yCor = this.yCor;
        bullet.angle = this.angle;
        // if the bullet was in use, reset it
        clearInterval(bullet.movingInterval);
        // start moving the bullet
        bullet.movingInterval = setInterval(() => {
            bullet.movePosition();
            bullet.update();
        }, this.bulletProperties.frameUpdateFrequency);
    }
    setShootCooldown() {
        this.ableToShoot = false;
        setTimeout(() => { this.ableToShoot = true }, this.bulletProperties.cooldown);
    }
    getBullet() {
        const bullet = this.bullets[this.currentBulletNumber];
        this.currentBulletNumber += 1;
        if (this.currentBulletNumber > this.bulletsCount - 1) {
            this.currentBulletNumber = 0;
        }
        return bullet;
    }
    prepareBullets(quantity) {
        const bullets = [];
        for (let i = 0; i < quantity; i++) {
            bullets.push(this.createBullet());
        }
        return bullets;
    }
    createBullet() {
            const bullet = new GameObject(null, null, this.bulletProperties.width, this.bulletProperties.height);
            bullet.addImage(this.bulletProperties.imageName, this.bulletProperties.imageSrc);
            bullet.currentImage = bullet.images[this.bulletProperties.imageName];
            bullet.speed = this.bulletProperties.speed;
            return bullet;
        }
        // End of shooting functions
}