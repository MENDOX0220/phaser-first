var End = {
    create : function(){
        let mainButton = game.add.button(game.world.width / 2, game.world.height / 2,
            "button", this.gomain);
            let finalScore = game.add.text(game.world.width / 2, game.world.height / 3,
                "score + " + score)
    },
    gomain : function(){
        game.state.start("main");
    }
}
game.state.add("End", End);