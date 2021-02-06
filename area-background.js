function createBgGradient(background) {
    const x = parseInt((background.layer.canvas.width) / 2);
    const y = parseInt((background.layer.canvas.height) / 2);
    r0 = 20;
    r1 = 1000;

    bgGradient = background.layer.ctx.createRadialGradient(x, y, r0, x, y, r1)

    bgGradient.addColorStop(0, "#390050");
    bgGradient.addColorStop(1, "#08004e");
    background.layer.ctx.fillStyle = bgGradient;
    background.layer.ctx.rect(0, 0, background.layer.canvas.width, background.layer.canvas.height);
    background.layer.ctx.fill();
}