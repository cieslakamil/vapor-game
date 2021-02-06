class CanvasLayer {
    static layersCount = 0;
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'layer' + CanvasLayer.layersCount;
        CanvasLayer.layersCount += 1;
        $(this.canvas).addClass('layer');
        $('#layers').append(this.canvas);
        this.canvas.width = 1920;
        this.canvas.height = 1200;
        this.ctx = this.canvas.getContext('2d');
    }
    clear() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        // unsused function for drawing.
        /*
    draw(image, xCor, yCor) {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.setTransform(1, 0, 0, 1, xCor + parseInt(this.canvas.width / 2), yCor + parseInt(this.canvas.height / 2));
        this.ctx.drawImage(image, -image.width / 2, -image.height / 2);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
        */
}