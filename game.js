var game = new Phaser.Game(1200, 900,
    Phaser.CANVAS, "GameDiv")
    var player;
var play = {
    preload: function () {
        game.load.image("player", "phaseee.png");
    },
    create: function () {
        player = game.add.sprite(100, 100, "player");
     
        let up = game.input.keyboard.addKey(
            Phaser.Keyboard.W
        );  
        up.onDown.add(this.up, this);

        let down = game.input.keyboard.addKey(
            Phaser.Keyboard.S
        );  
        down.onDown.add(this.down, this);

        let right  = game.input.keyboard.addKey(
            Phaser.Keyboard.D
        );
        right.onDown.add(this.right, this);

        let left = game.input.keyboard.addKey(
            Phaser.Keyboard.A
        );  
        left.onDown.add(this.left, this);
    },
    right : ()=> {
        player.x += 100;
    },
    left : ()=> {
        player.x -= 100;
    },
    up : () => {
        player.y -= 100;
    },
    down : ()=>{
        player.y += 100;
    }
         
}
game.state.add("Play", play);
game.state.start("Play");