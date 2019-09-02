    var game = new Phaser.Game(1200, 900,
        Phaser.CANVAS, "GameDiv")
    class Player {
        constructor() {
            this.sprite = game.add.sprite(100, 100, "player");
            this.sprite.anchor.setTo(0.5, 0.5);
            game.physics.arcade.enable(this.sprite);
            this.moveSpeed = 1200;
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
    class Bullet {
        constructor(_x, _y, _type, _target) {
            this.sprite = game.add.sprite(_x, _y, _type);
            game.physics.arcade.enable(this.sprite);
            this.target = _target;
        }
        setAngle() {
            this.sprite.rotation = game.physics.arcade.angleBetween(
                this.sprite, this.target
            );
        }
        move() {

        }
        update() {
            this.move();
        }
    }
    class NormalBullet extends Bullet {
        constructor(_x, _y, _target) {
            super(_x, _y, "normalBullet", _target);
            this.setAngle();
        }
        move() {
            game.physics.arcade.velocityFromAngle(
                this.sprite.angle, 900, this.sprite.body.velocity
            );
        }
    }
    class TrackingBullet extends Bullet {
        constructor(_x, _y, _target) {
            super(_x, _y, "trackingBullet", _target);
            this.setAngle();
        }
        move() {
            game.physics.arcade.velocityFromAngle(
                this.sprite.angle, 100, this.sprite.body.velocity
            );
            this.setAngle();
        }
    }
    function collision(_player, _bullet) {
        _bullet.destroy();
    }

    function collider() {
        game.physics.arcade.overlap(player.sprite, bullet.sprite, null, this);
    }

    var player;
    var bullet;

    var play = {
        preload: function () {
            game.load.image("player", "phaseee.png");
            game.load.image("normalBullet", "aaa.jpg");
            game.load.image("trackingBullet", "aaa.jpg");
        },
        create: function () {
            game.scale.pageAlignHorisontally = true;
            game.scale.pageAlignVertically = true;
            game.stage.backgroundColor = "#AAAAAA"
            player = new Player();

            bullet = new TrackingBullet(300, 300, player.sprite);
        },
        update: function () {
            player.update();
            bullet.update();
            collider();
        }
    }
    game.state.add("Play", play);
    game.state.start("Play");