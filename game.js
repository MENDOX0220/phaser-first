var game = new Phaser.Game(1200, 900,
    Phaser.CANVAS, "GameDiv")
class Player {
    constructor() {
        this.sprite = game.add.sprite(100, 100, "player");
        this.sprite.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.sprite);
        this.moveSpeed = 300;
    }
    update() {
        game.physics.arcade.moveToPointer(this.sprite, this.moveSpeed);
        if (Phaser.Rectangle.contains(this.sprite.body,
            game.input.mousePointer.x,
            game.input.mousePointer.y)) {
            this.sprite.body.velocity.setTo(0, 0);
        }
    }
}
var play = {
    preload: function () {
        game.load.image("player", "phaseee.png");
    },
    create: function () {
        player = new Player();
    },
    update: function () {
        player.update();
    }
}
game.state.add("Play", play);
game.state.start("Play");