var mainState = {

    preload: function() {
    	game.load.spritesheet('player', 'assets/character.png', 65, 85);
    	game.load.spritesheet('bullet', 'assets/shot.png', 20,20);
    	game.load.spritesheet('box','assets/box.png', 30, 200);
    	game.load.spritesheet('bot','assets/bot.png',65,85);

    },

    create: function() {
    	game.physics.startSystem(Phaser.Physics.ARCADE);
    	game.stage.backgroundColor = '#a8e8ff';
		this.myWorld = game.add.group();
    	this.myWorld.enableBody = true;
    	this.createbox();
    	this.creatbullets();
    	this.creatplayer();
    	this.creatbot();
    	this.corsors = this.input.keyboard.createCursorKeys();		

    },

    update: function() {
    	game.physics.arcade.collide(this.player, box);
    	game.physics.arcade.collide(this.player, this.bot);
    	game.physics.arcade.overlap(bullets,box,this.collectBullet, null, this);
    	game.physics.arcade.overlap(this.bot,bullets,this.botcheck, null, this);
    	this.controllPlayer();
    	this.AIbot();
    },

   	collectBullet: function(bullets){
   		bullets.kill();
   	},
   	controllPlayer: function(){
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
   	creatbullets: function(){
   		bullets = game.add.group();
    	bullets.enableBody = true;
    	bullets.physicsBodyType = Phaser.Physics.ARCADE;
    	bullets.createMultiple(20, 'bullet', 0, false);
    	bullets.setAll('anchor.x', 0.5);
    	bullets.setAll('anchor.y', 1);
    	bullets.setAll('outOfBoundsKill', true);
    	bullets.setAll('checkWorldBounds',true);
    	keyA = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		keyA.onDown.add(this.shot_now, this);
   	},
   	creatplayer: function(){
   		this.player = game.add.sprite(0, 450, 'player');
		game.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.animations.add('down', [0,1,2,3,4,5,6], 10, false);
		this.player.animations.add('up', [7,8,9,10,11,12,13], 10, false);
		this.player.animations.add('left', [14,15,16,17,18,19,20], 10, false);
		this.player.animations.add('right', [21,22,23,24,25,26,27], 10, false);
		this.player.frame = 1;
   	},
   	createbox: function(){
   		box = game.add.physicsGroup(Phaser.Physics.ARCADE);
   		var b = box.create(250,220,'box');
   		b.body.immovable = true;
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
   	},
   	creatbot: function(){
   		this.bot = game.add.sprite(500,500, 'bot');
   		game.physics.arcade.enable(this.bot);
		this.bot.body.collideWorldBounds = true;
		this.bot.animations.add('down', [0,1,2,3,4,5,6], 10, false);
		this.bot.animations.add('up', [7,8,9,10,11,12,13], 10, false);
		this.bot.animations.add('left', [14,15,16,17,18,19,20], 10, false);
		this.bot.animations.add('right', [21,22,23,24,25,26,27], 10, false);
		this.bot.frame = 14;
   	},
   	botcheck: function(bullets, bot){
   		bot.kill();
   	},
   	AIbot: function(){
   		this.bot.body.velocity.x = 0;
    	this.bot.body.velocity.y = 0;
    	
	}
};
var bot;
var box;
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