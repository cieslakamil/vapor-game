/**
 * Basic element in the game, contains:
 * layer
 * images
 */
class GameObject {
    constructor(x, y, width, height) {
            this.layer = new CanvasLayer;
            this.xCor = x;
            this.yCor = y;
            this.width = width;
            this.height = height;
            this.speed = 0;

            this.angle = 0
            this.moveAngle = 0; // Why this name? maybe change it?
            this.images = {};
            this.currentImage = null;
        }
        /**
         * Add an image to a list of images.
         * @param {string} name image name used as a key in image list "images".
         * @param src source directory of an image.
         */
    addImage(name, src) {
        this.images[name] = new Image();
        this.images[name].src = src;
    }
    update() {
        this.layer.ctx.save();
        this.layer.ctx.translate(this.xCor, this.yCor);
        this.layer.ctx.rotate(this.angle);
        this.layer.ctx.drawImage(this.currentImage, parseInt(this.width / -2), parseInt(this.height / -2));
        this.layer.ctx.restore();
    }
    rotate() {

    }
    catchPlayerMove() {
        if (arrowControls['left']) {
            this.moveAngle = -10;
        }
        if (arrowControls['right']) {
            this.moveAngle = 10;
        }
        if (arrowControls['up']) {
            this.speed = 20;
        }
        if (arrowControls['down']) {
            this.speed = -20;
        }
    }
    changePos() {
        this.angle += this.moveAngle * Math.PI / 180;
        this.xCor += this.speed * Math.sin(this.angle);
        this.yCor -= this.speed * Math.cos(this.angle);
        this.moveAngle = 0;
        this.speed = 0;
    }
}