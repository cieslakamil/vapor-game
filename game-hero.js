class GameHero {
    constructor() {
        super();
        this.name = 'vapor'

        this.health = 0;
        this.heading = null;
    }
    move() {
        super.move(this.heading);
    }
}