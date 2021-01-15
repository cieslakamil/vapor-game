/**
 * Basic element in the game, contains:
 * layer
 * images
 */
class GameObject {
    constructor() {
            this.layer = new CanvasLayer;
            this.images = {};
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

}