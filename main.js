var mainState = {
    preload: function() {
    	game.load.image('ground','assets/ground.png');
    	//game.load.image('devahoy','assets/logo.png');
    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = '#a8e8ff';

    	this.myWorld = game.add.group();
    	//game.add.sprite(0,0,'devahoy');
    	this.myWorld.enableBody = true;

    	var ground = this.myWorld.create(0,game.world.height - 64,'ground');
		ground.scale.setTo(2,2);
		ground.body.immovable = true;

    },

    update: function() {

    }
};


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');