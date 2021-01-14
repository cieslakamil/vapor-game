class CanvasLayer {
    constructor(canvasId) {
        this.canvas = $('#background-layer');
        this.canvas.get(0).width = 1920;
        this.canvas.get(0).height = 1200;
        this.ctx = this.canvas.get(0).getContext('2d');
    }
}