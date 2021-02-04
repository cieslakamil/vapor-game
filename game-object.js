/**
 * Basic element in the game, contains:
 * layer
 * images
 */
class GameObject {
    constructor(x, y, width, height) {
        this.layer = new CanvasLayer;
        this.xCor = x + width / 2;
        this.yCor = y;
        this.width = width;
        this.height = height;
        this.size = 1;
        this.speed = 0;
        this.angle = 0
        this.images = {};
        this.currentImage = null;
    }
    addImage(name, src) {
        this.images[name] = new Image();
        this.images[name].src = src;
    }
    update() {
        this.layer.clear();
        this.layer.ctx.save();
        this.layer.ctx.translate(this.xCor, this.yCor);
        this.layer.ctx.rotate(this.angle);
        this.layer.ctx.drawImage(this.currentImage, parseInt(this.width / -2), parseInt(this.height / -2));
        this.layer.ctx.restore();
    }
    movePosition(speed = this.speed) {
        this.xCor += speed * Math.sin(this.angle);
        this.yCor -= speed * Math.cos(this.angle);
    }
    moveAngle(degrees) {
        this.angle += degrees * Math.PI / 180;
    }

}