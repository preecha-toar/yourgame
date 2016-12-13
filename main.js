var mainState = {
    preload: function() {
    	game.load.image('devahoy','assets/logo.png');
    },

    create: function() {
    	game.stage.backgroundColor = '#a8e8ff';
    	game.add.sprite(0,0,'devahoy');
    },

    update: function() {

    }
};
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');