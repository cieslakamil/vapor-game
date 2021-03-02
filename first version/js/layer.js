class Layer {
    layersCount = 0;
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");
        this.canvas.id = "layer" + Layer.layersCounter;
        this.canvas.className = "layer";
        this.canvas.width = areaX;
        this.canvas.height = areaY;
        this.rotation = 0;
        this.canvas.style.zIndex = Layer.layersCount;
        document.getElementById("layers").appendChild(this.canvas);
        Layer.layersCount++;
    }
    clearLayer() { this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
    draw(rotation = 0) {
        this.ctx.setTransform(1, 0, 0, 1, this.x + this.width / 2, this.y + this.height / 2);
        this.ctx.rotate(rotation);
        this.ctx.drawImage(this.image, -this.image.width / 2, -this.image.height / 2);
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
}