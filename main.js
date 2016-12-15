var mainState = {

    preload: function() {
    	game.load.spritesheet('player', 'assets/character.png', 65, 85);
    	game.load.spritesheet('shot', 'assets/shot.png', 30,18);

    },

    create: function() {
    	var keyA;
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = '#a8e8ff';
		this.myWorld = game.add.group();
    	this.myWorld.enableBody = true;

    	
    	
    	//player
		this.player = game.add.sprite(0, 450, 'player');
		game.physics.arcade.enable(this.player);
		//this.player.body.bounce.y = 0.25;
		//this.player.body.gravity.y = 980;
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('down', [0,1,2,3,4,5,6], 10, false);
		this.player.animations.add('up', [7,8,9,10,11,12,13], 10, false);
		this.player.animations.add('left', [14,15,16,17,18,19,20], 10, false);
		this.player.animations.add('right', [21,22,23,24,25,26,27], 10, false);
		this.player.frame = 1;

		this.corsors = this.input.keyboard.createCursorKeys();
		//***************************************************
		keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyA.onDown.add(addPhaserShot, this);
		//game.input.keyboard.removeKeyCapture(Phaser.Keyboard.a);
    },

    update: function() {

    	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;
    	if(this.corsors.up.isDown){
    		this.player.body.velocity.y = -100;
    		this.player.animations.play('up');
    	}else if(this.corsors.down.isDown){
    		this.player.body.velocity.y = 100;
    		this.player.animations.play('down');
    	}else if(this.corsors.left.isDown){
    		this.player.body.velocity.x = -100;
    		this.player.animations.play('left');
    	}else if(this.corsors.right.isDown){
    		this.player.body.velocity.x = 100;
    		this.player.animations.play('right');
    	}
    },
    /*
    addPhaserShot: function(){
    	this.game.add.sprite(game.player.X, game.player.Y, 'shot');
    	this.shot.body.velocity.x = -200;
    }*/
};

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');

//credit: https://phaser.io/examples/v2/input/cursor-key-movement