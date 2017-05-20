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
	}

	function onUpdate() {
		// do something
	}	
}