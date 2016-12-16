var mainState = {

    preload: function() {
    	game.load.spritesheet('player', 'assets/character.png', 65, 85);
    	game.load.spritesheet('bullet', 'assets/shot.png', 30,18);

    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = '#a8e8ff';
		this.myWorld = game.add.group();
    	this.myWorld.enableBody = true;

    	bullets = game.add.group();
    	bullets.createMultiple(500, 'bullet', 0, false);
    	
    	//player
		this.player = game.add.sprite(0, 450, 'player');
		game.physics.arcade.enable(this.player);
		//game.camera.follow(player);
		//this.player.body.bounce.y = 0.25;
		//this.player.body.gravity.y = 980;
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('down', [0,1,2,3,4,5,6], 10, false);
		this.player.animations.add('up', [7,8,9,10,11,12,13], 10, false);
		this.player.animations.add('left', [14,15,16,17,18,19,20], 10, false);
		this.player.animations.add('right', [21,22,23,24,25,26,27], 10, false);
		this.player.frame = 1;

		this.corsors = this.input.keyboard.createCursorKeys();
	
		keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyA.onDown.add(this.shot_now, this);
		game.input.keyboard.removeKeyCapture(Phaser.Keyboard.a);
		
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
	shot_now: function(){
    	game.add.sprite(game.world.randomX, game.world.randomY, 'bullet');
    	//fireball.reset(player.x-20, player.y);
    }
};
var shotRate = 300;
var nextshot = 0;
var bullets;
var shot = false;
var fireRate = 300;
var keyA;
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');

//credit: https://phaser.io/examples/v2/input/cursor-key-movement