class GameObject extends Layer {
    constructor() {
        super();
        this.scanArea = gameArea;
        this.name = "defaultGameObject";
        this.x = 0;
        this.y = 0;
        this.solid = false;
        this.image = new Image();
        this.owner = null;
    }
    setPropertyTo(object) {
        for (let i = this.x; i < this.x + this.width; i++) {
            gameArea[i][this.y] = object;
        }
        for (let i = this.y + 1; i < this.y + this.height; i++) {
            gameArea[this.x + this.width][i] = object;
        }
        for (let i = this.x + this.width - 1; i > this.x; i--) {
            gameArea[i][this.y + this.height] = object;
        }
        for (let i = this.y + this.height - 1; i > this.y + 1; i--) {
            gameArea[this.x][i] = object;
        }
    }
    bind = () => this.setPropertyTo(this);
    unbind = () => this.setPropertyTo(null);
    draw(rotation = null) {
        if (rotation == null) {
            switch (this.vector) {
                case "left":
                    rotation = Math.PI / 2;
                    break;
                case "right":
                    rotation = -Math.PI / 2;
                    break;
                case "up":
                    rotation = Math.PI;
                    break;
                case "down":
                    rotation = 0;
                    break;
            }
        }
        this.clearLayer();
        super.draw(rotation);
    }
    move(vector = this.vector) {
        this.unbind();
        const speed = this.speed[vector];
        switch (vector) {
            case "left":
                this.x -= speed;
                this.rotation = Math.PI / 2;
                break;
            case "right":
                this.x += speed;
                this.rotation = -Math.PI / 2;
                break;
            case "up":
                this.y -= speed;
                this.rotation = Math.PI;
                break;
            case "down":
                this.y += speed;
                this.rotation = 0;
                break;
        }
        this.bind();
        this.draw(this.rotation);
    }

    scan(vector, objectsNamesList) {
        let vectorSpeed, dimension, speedIterator, movedCord, staticCord, checkedObject;
        switch (vector) {
            case "left":
                {
                    vectorSpeed = this.speed.left;
                    dimension = this.height;
                    speedIterator = -1;
                    movedCord = this.x;
                    staticCord = this.y;
                    break;
                }
            case "right":
                {
                    vectorSpeed = this.speed.right;
                    dimension = this.height;
                    speedIterator = 1;
                    movedCord = this.x + this.width;
                    staticCord = this.y;
                    break;
                }
            case "up":
                {
                    vectorSpeed = this.speed.up;
                    dimension = this.width;
                    speedIterator = -1;
                    movedCord = this.y;
                    staticCord = this.x;
                    break;
                }
            case "down":
                {
                    vectorSpeed = this.speed.down;
                    dimension = this.width;
                    speedIterator = 1;
                    movedCord = this.y + this.height;
                    staticCord = this.x;
                    break;
                }
        }
        for (let tempSpeed = 1; tempSpeed <= vectorSpeed; tempSpeed++) {
            for (let i = 0; i < dimension; i++) {
                if (vector == "left" || vector == "right")
                    checkedObject = this.scanArea[movedCord + tempSpeed * speedIterator][staticCord + i];
                else if (vector == "up" || vector == "down")
                    checkedObject = this.scanArea[staticCord + i][movedCord + tempSpeed * speedIterator];
                if (checkedObject != null)
                    for (let i = 0; i < objectsNamesList.length; i++)
                        if (checkedObject.name == objectsNamesList[i]) return checkedObject;
            }
        }
        return null;
    }
}
class MapObject extends GameObject {
    constructor() {
        super();
        this.name = "mapObject";
        this.solid = true;
        this.ctx.strokeStyle = ('#FFBC00');
        this.ctx.lineWidth = 5;


    }
    draw() {
        if (this.image.complete) super.draw();
        else this.image.onload = () => super.draw();
    }
    build(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.bind();

        this.ctx.strokeRect(x, y, w, h);
    }
}