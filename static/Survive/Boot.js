//grundeinstellungen
//zuerst hintergrund setzen dann alles dar?ber laden
//dann im n?chsten alles dar?ber setzen

var Survive = {};

Survive.Boot = function(game) {};






Survive.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
//        this.load.image('titleimage', 'images/TitleImage.png');
    },

    create: function() {
        this.input.maxPointers = 1; //nur ein curser
        this.stage.disableVisibilityChange = false; //pauses the game when open another tab
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.minWidth = 270;
        this.scale.minHeight = 480;
        this.scale.pageAlignHorizontally = true;//center game
        this.scale.pageAlignVertically = true;//center game
        this.stage.forcePortrait = true;
        this.scale.setScreenSize(true);//force ScreenSize
        this.input.addPointer();
        this.stage.backgroundColor = '#171642';

        this.state.start('Preloader');
    }
}
