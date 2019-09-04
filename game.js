var game = new Phaser.Game(1600, 920, Phaser.CANVAS, "GameDiv")

class Player{
    constructor(){
        this.sprite = game.add.sprite(400,800,"player");
        this.sprite.anchor.setTo(0.5,0.5)
        game.physics.arcade.enable(this.sprite)
        this.moveSpeed = 2000;
        
    }
    update(){
        game.physics.arcade.moveToPointer(this.sprite,this.moveSpeed);
        if(Phaser.Rectangle.contains(this.sprite.body,game.input.mousePointer.x,game.input.mousePointer.y)){
            this.sprite.body.velocity.setTo(0,0);
        }
    }
    
}

class Bullet{
    constructor(x,y,type,target){
        this.sprite = game.add.sprite(x,y,type)
        game.physics.arcade.enable(this.sprite)
        this.target = target
        bullets.push(this);
    }
    setAngle(){
        this.sprite.rotation = game.physics.arcade.angleBetween(this.sprite,this.target)
    }
    move(){
        
    }
    update(){
        this.move();
    }
    despawn(){
        this.sprite.destroy();
        let idx = bullets.findIndex(x=>x==this)
        if(idx != -1){
            bullets.splice(idx,1)
        }
        
    }
}
class NormalBullet extends Bullet{
    constructor(x,y,target){
        super(x,y,"NormalBullet",target)
        this.setAngle();
    }
    move(){
        game.physics.arcade.velocityFromAngle(this.sprite.angle,400,this.sprite.body.velocity);
        if((this.sprite.x < 0 || this.sprite.x > game.world.width) || (this.sprite.y < 0 || this.sprite.y > game.world.height)){
            this.despawn();
        }
    }
}

class TrackingBullet extends Bullet{
    constructor(x,y,target){
        super(x,y,"TrackingBullet",target)
        this.setAngle();
        this.killTime = game.time.now + 5000;
    }
    move(){
        this.setAngle();
        game.physics.arcade.velocityFromAngle(this.sprite.angle,200,this.sprite.body.velocity);
        if(game.time.now>= this.killTime){
            this.despawn();
        }
    }
}

class System{
    constructor(){
        this.spawnTimer = game.time.create(false);
        this.spawnTimer.loop(3000, this.randomSpawn,this);
    }
    start(){
        this.spawnTimer.start();
    }
    randomSpawn(){
        for(let i=0; i<game.rnd.between(3,7); i++){
            let rx = game.rnd.between(0, game.world.width);
            let rtype = game.rnd.between(0,1) ? "NormalBullet" : "TrackingBullet";
            this.spawnBullet(rx,rtype)
        }
    }
    spawnBullet(x,type){
        if(type == "NormalBullet"){
            new NormalBullet (x,0,player.sprite);
        }
        else if(type == "TrackingBullet"){
            new TrackingBullet(x,0,player.sprite);
        }
    }
    update(){
        for(let i=0; i<bullets.length; i++){
            if(bullets[i].sprite.alive){
            bullets[i].update();
            }
        }
    }
}

var player;
var bullets=[];
var system;


var play = {
    preload: function () {
        game.load.image("player", "phaseee.png");
        game.load.image("NormalBullet","aaa.jpg");
        game.load.image("TrackingBullet","aaa2.png");

    },
    create: function () {
        game.scale.pageAlignHorizontally=true;
        game.scale.pageAlignVertically=true;
        game.stage.backgroundColor="#ffffff"

        player = new Player();
        system = new System();
        system.start();


    },
    update : function() {
        player.update();
        system.update();
        collider();
    }
}

function collision(player,bullet){
    bullet.destroy();
}

function collider(){
    for(let i =0; i<bullets.length; i++){
        game.physics.arcade.overlap(player.sprite, bullets[i].sprite,collision,null,this);
    }
}

game.state.add("Play", play)
game.state.start("Play")