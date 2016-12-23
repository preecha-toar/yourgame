var mainState = {

    preload: function() {
    	game.load.spritesheet('player', 'assets/character.png', 65, 85);
    	game.load.spritesheet('bullet', 'assets/shot.png', 20,20);

    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = '#a8e8ff';
		this.myWorld = game.add.group();
    	this.myWorld.enableBody = true;

    	bullets = game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;
    	bullets.createMultiple(20, 'bullet', 0, false);

    	bullets.setAll('anchor.x', 0.5);
    	bullets.setAll('anchor.y', 1);
    	bullets.setAll('outOfBoundsKill', true);
    	bullets.setAll('checkWorldBounds',true);
    	keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
		keyA.onDown.add(this.shot_now, this);
		

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
    },

    update: function() {

    	this.player.body.velocity.x = 0;
    	this.player.body.velocity.y = 0;
    	if(this.corsors.up.isDown){
    		this.player.body.velocity.y = -100;
    		this.player.animations.play('up');
    		state = 3;
		}else if(this.corsors.down.isDown){
    		this.player.body.velocity.y = 100;
    		this.player.animations.play('down');
    		state = 4;
    	}else if(this.corsors.left.isDown){
    		this.player.body.velocity.x = -100;
    		this.player.animations.play('left');
    		state = 1;
    	}else if(this.corsors.right.isDown){
    		this.player.body.velocity.x = 100;
    		this.player.animations.play('right');
    		state = 2;
		}
    
    	
    },
	shot_now: function(){
		if(game.time.now > nextshot){
    		nextshot = game.time.now + shotRate;
    		var bullet = bullets.getFirstExists(false);
    		if(bullet){
    			if(state == 1){
    				bullet.reset(this.player.x - 10, this.player.y + 70);
    				bullet.body.velocity.x = -300;
    			}else if(state == 2){
    				bullet.reset(this.player.x + 70, this.player.y + 70);
    				bullet.body.velocity.x = 300;
    			}else if(state == 3){
    				bullet.reset(this.player.x + 30, this.player.y + 70);
    				bullet.body.velocity.y = -300;
    			}else if(state == 4){
    				bullet.reset(this.player.x + 30, this.player.y + 90);
    				bullet.body.velocity.y = 300;
    			}
    		}
    	}
   	}
};
var state;
var bulletButton;
var player;
var shotRate = 300;
var nextshot = 0;
var bullets;
var shot = false;
var fireRate = 300;
var keyA;
var game = new Phaser.Game(1200, 600, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');

//credit: https://phaser.io/examples/v2/input/cursor-key-movement