var game = new Phaser.Game(1200, 900, Phaser.CANVAS, "GameDiv")

class Player {
    constructor() {
        this.sprite = game.add.sprite(game.world.width / 2, game.world.height / 2, "player");
        this.sprite.anchor.setTo(0.5, 0.5)
        game.physics.arcade.enable(this.sprite)
        this.moveSpeed = 1300;
        this.hp = 4;

    }
    update() {
        game.physics.arcade.moveToPointer(this.sprite, this.moveSpeed);
        if (Phaser.Rectangle.contains(this.sprite.body, game.input.mousePointer.x, game.input.mousePointer.y)) {
            this.sprite.body.velocity.setTo(0, 0);
        }
    }

}

class Bullet {
    constructor(x, y, type, target) {
        this.sprite = game.add.sprite(x, y, type)
        game.physics.arcade.enable(this.sprite)
        this.target = target
        bullets.push(this);
    }
    setAngle() {
        this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite, this.target)
    }
    move() {

    }
    update() {
        this.move();
    }
    despawn() {
        this.sprite.destroy();
        let idx = bullets.findIndex(x => x == this)
        if (idx != -1) {
            bullets.splice(idx, 1)
        }

    }
}

class NormalBullet extends Bullet {
    constructor(x, y, target) {
        super(x, y, "NormalBullet", target)
        this.setAngle();
    }
    move() {
        game.physics.arcade.velocityFromAngle(this.sprite.angle, 400, this.sprite.body.velocity);
        if ((this.sprite.x < 0 || this.sprite.x > game.world.width) || (this.sprite.y < 0 || this.sprite.y > game.world.height)) {
            this.despawn();
        }
    }
}

class TrackingBullet extends Bullet {
    constructor(x, y, target) {
        super(x, y, "TrackingBullet", target)
        this.setAngle();

        this.trackOn = true;
    }
    move() {
        if (game.physics.arcade.distanceBetween(this.sprite, player.sprite) <= 200) {
            this.trackOn = false;
        }
        if (this.trackOn) {
            this.setAngle();
        }
        game.physics.arcade.velocityFromAngle(this.sprite.angle, 200, this.sprite.body.velocity);
        if ((this.sprite.x < 0 || this.sprite.x > game.world.width) || (this.sprite.y < 0 || this.sprite.y > game.world.height)) {
            this.despawn();
        }
    }
}

class System {
    constructor() {
        this.spawnDelay = 3000;
        this.spawnTime = game.time.now + this.spawnDelay;
    }

    randomSpawn() {
        for (let i = 0; i < game.rnd.between(3, 7); i++) {
            let rx = game.rnd.between(0, game.world.width);
            let rtype = game.rnd.between(0, 1) ? "NormalBullet" : "TrackingBullet";
            this.spawnBullet(rx, rtype)
        }
    }
    spawnBullet(x, type) {
        if (type == "NormalBullet") {
            new NormalBullet(x, 0, player.sprite);
        }
        else if (type == "TrackingBullet") {
            new TrackingBullet(x, 0, player.sprite);
        }
    }
    update() {
        if (game.time.now >= this.spawnTime) {
            this.randomSpawn();
            score += 10;
            if(this.spawnDelay >= 500){
                this.spawnDelay *= 0.9;
            }
            this.spawnDelay *= 0.9;
            this.spawnTime = game.time.now + this.spawnDelay;
        }
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].sprite.alive) {
                bullets[i].update();
            }
        }
    }
}

var player;
var bullets = [];
var system;
var scoreText;
var text;
var play = {
    create: function () {

        player = new Player();
        system = new System();
        text = game.add.text(0, 0, "hp : ");
        score = 0;
        scoreText = game.add.text(0, 50, "score : ");

    },
    update: function () {
        player.update();
        system.update();
        collider();
        text.setText("hp : " + player.hp);
        scoreText.setText("score : " + score);
    }
}

function collision(_player, bullet) {
    bullet.destroy();
    if (--player.hp == 0) {
        game.state.start("End");
    }
}

function collider() {
    for (let i = 0; i < bullets.length; i++) {
        game.physics.arcade.overlap(player.sprite, bullets[i].sprite, collision, null, this);
    }
}

game.state.add("Play", play)