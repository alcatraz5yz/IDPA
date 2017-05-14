Survive.StartMenu = function(game) {
    this.audio;
    this.image;
    this.text;

}
//nur physik zeugs muss gezeigt werden wann und mit was und wie // mit audio muss das nicht gemacht werden






Survive.StartMenu.prototype = {

    create: function () {
    this.audio = this.add.audio('select_audio');//declariere sound
        image = this.add.image(0, 0, 'titlescreen');//declariere hintergrundbild
    text = this.add.bitmapText(this.world.centerX-155, this.world.centerY+280, 'eightbitwonder', 'Press to Start', 24);//text
        text.inputEnabled = true;//you can click on it now to start the game
        text.events.onInputDown.addOnce(this.startGame, this);//muss nur einmal gedr?ckt werden um game zu starten noch declarieren wann?

    },

    startGame: function (pointer) {
    this.audio.play();//mit pointer ist input enabled gemeint hier sound wird beim clicken gestartet
        this.state.start('Game');//game wird nach sound gestartet
    }
};
//1.hintergrundbild/  2.text start/   3.sound/    4.clickbarer text enabled dann sound.play
