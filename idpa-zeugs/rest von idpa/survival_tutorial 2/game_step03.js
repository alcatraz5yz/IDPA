window.onload = function() {
	
	var game = new Phaser.Game(640,480,Phaser.CANVAS,"",{preload:onPreload, create:onCreate, update:onUpdate});                
	
	var player;
	var wallsBitmap;
	var floor;

	function onPreload() {
		game.load.image("floor","floor.png");
		game.load.image("walls","walls.png");
		game.load.image("player","player.png");
	}

	function goFullScreen(){
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		game.scale.setScreenSize(true);
	}

	function onCreate() {
		goFullScreen();
		floor = game.add.sprite(0,0,"floor");
		wallsBitmap = game.make.bitmapData(640,480);
		wallsBitmap.draw("walls");
		wallsBitmap.update();
		game.add.sprite(0,0,wallsBitmap);
		player = game.add.sprite(80,80,"player");
		player.anchor.setTo(0.5,0.5);
		cursors = game.input.keyboard.createCursorKeys();
	}

	function onUpdate() {
		var xSpeed = 0;
		var ySpeed = 0;
		if(cursors.up.isDown){
			ySpeed -=1;
		}
		if(cursors.down.isDown){
			ySpeed +=1;
		}
		if(cursors.left.isDown){
			xSpeed -=1;
		}
		if(cursors.right.isDown){
			xSpeed +=1;
		}
		if(Math.abs(xSpeed)+Math.abs(ySpeed)<2 && Math.abs(xSpeed)+Math.abs(ySpeed)>0){
			var color = wallsBitmap.getPixel32(player.x+xSpeed+player.width/2,player.y+ySpeed+player.height/2);
			color+= wallsBitmap.getPixel32(player.x+xSpeed-player.width/2,player.y+ySpeed+player.height/2);
			color+=wallsBitmap.getPixel32(player.x+xSpeed-player.width/2,player.y+ySpeed-player.height/2)
			color+=wallsBitmap.getPixel32(player.x+xSpeed+player.width/2,player.y+ySpeed-player.height/2)
			if(color==0){
				player.x+=xSpeed;
				player.y+=ySpeed;
			}
		}
	}	
}