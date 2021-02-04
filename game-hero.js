class GameHero extends GameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.name = 'vapor'
        this.health = 0;
        this.speed = 20;
        this.ableToShoot = true;
        this.steeringAngle = 11;
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
    }
    catchPlayerAction() {
        if (arrowControls['left']) {
            this.moveAngle(this.steeringAngle * (-1));
        }
        if (arrowControls['right']) {
            this.moveAngle(this.steeringAngle);
        }
        if (arrowControls['up']) {
            this.movePosition(this.speed);
        }
        if (arrowControls['down']) {
            this.movePosition(this.speed * (-1));
        }
        if (arrowControls['space']) {
            if (this.ableToShoot) {
                let bullet = this.getBullet();
                this.shoot(bullet);
                //this.setShootCooldown();
            }
        }
    }
    shoot(bullet) {
        bullet.xCor = this.xCor;
        bullet.yCor = this.yCor;
        bullet.angle = this.angle;
        clearInterval(bullet.movingInterval);
        bullet.movingInterval = setInterval(() => {
            bullet.movePosition();
            bullet.update();
        }, this.bulletProperties.frameUpdateFrequency);
    }
    setShootCooldown() {
        this.ableToShoot = false;
        setTimeout(() => { this.ableToShoot = true }, this.bulletProperties.cooldown);
    }
    createBullet() {
        const bullet = new GameObject(null, null, this.bulletProperties.width, this.bulletProperties.height);
        bullet.addImage(this.bulletProperties.imageName, this.bulletProperties.imageSrc);
        bullet.currentImage = bullet.images[this.bulletProperties.imageName];
        bullet.speed = this.bulletProperties.speed;
        return bullet;
    }
    prepareBullets(quantity) {
        const bullets = [];
        for (let i = 0; i < quantity; i++) {
            bullets.push(this.createBullet());
        }
        return bullets;
    }
    getBullet() {
        const bullet = this.bullets[this.currentBulletNumber];
        this.currentBulletNumber += 1;
        if (this.currentBulletNumber > this.bulletsCount - 1) {
            this.currentBulletNumber = 0;
        }
        console.log(bullet);
        return bullet;
    }
}