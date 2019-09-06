var press = "...Press Spacebar..."
var Main = {
    preload: function () {
        game.load.image("player","phaseee.png");
        game.load.image("NormalBullet","aaa.jpg");
        game.load.image("TrackingBullet","aaa2.png");
        game.load.image("button", "adsf.png");

    },
    create: function () {
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        game.stage.backgroundColor = "#888888"

        let startbutton = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR

        );
        startbutton.onDown.addOnce(this.start, this);

        let text = game.add.text(game.world.width / 2 - press.length, game.world.height / 2,
            press);
    },
    start: function () {
        game.state.start("Play");
    }
}
game.state.add("main", Main);
game.state.start("main")