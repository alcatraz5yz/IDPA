BunnyDefender.Game = function(game) {
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



BunnyDefender.Game.prototype = {

    create: function() {//grundeinstellungen
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.music = this.add.audio('game_audio');//declariere gamesound
        this.music.play('', 0, 0.3, true);

        this.gameover = false;
        this.secondsElapsed = 0;
        this.timer = this.time.create(false);
        this.totalBunnies = 20;
        this.totalSpacerocks = 30;
        this.timer.loop(1000, this.updateSeconds, this);
        this.buildWorld();
    },

    updateSeconds: function() {
        this.secondsElapsed++;
    },

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buildWorld: function() {
        this.add.image(0, 0, 'sky');
        this.add.image(0, 800, 'hill');
        this.buildBunnies();
        this.buildSpaceRocks();
        this.buildEmitter();
        this.countdown = this.add.bitmapText(10, 10, 'eightbitwonder', 'Bunnies Left ' + this.totalBunnies, 20);
        this.timer.start();
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

    buildBunnies: function() {
        this.bunnygroup = this.add.group();
        this.bunnygroup.enableBody = true;
        for(var i=0; i<this.totalBunnies; i++) {
            var bunny = this.bunnygroup.create(this.rnd.integerInRange(-10, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'bunny', 'Bunny0000');
            bunny.anchor.setTo(0.5, 0.5);
            bunny.body.moves = false;
            bunny.animations.add('Rest', this.game.math.numberArray(1,58));
            bunny.animations.add('Walk', this.game.math.numberArray(68,107));
            bunny.animations.play('Rest', 24, true);
            this.assignBunnyMovement(bunny);
        }
    },
    assignBunnyMovement: function(bunny) {
        bunnyposition = Math.floor(this.rnd.realInRange(50, this.world.width-50));//bunny will move in the range of 50 to -50pxs
        bunnydelay = this.rnd.integerInRange(2000, 6000);//bunny will move after 2-6 seconds
        if(bunnyposition < bunny.x){
            bunny.scale.x = 1;//scale will flip the bunny when it arrives at the edge
        }else{
            bunny.scale.x = -1;
        }
        t = this.add.tween(bunny).to({x:bunnyposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bunnydelay);
        t.onStart.add(this.startBunny, this);
        t.onComplete.add(this.stopBunny, this);
    },

    startBunny: function(bunny) {
        bunny.animations.stop('Rest');
        bunny.animations.play('Walk', 24, true);
    },

    stopBunny: function(bunny) {
        bunny.animations.stop('Walk');
        bunny.animations.play('Rest', 24, true);
        this.assignBunnyMovement(bunny);
    },

    checkBunniesLeft: function() {
        if(this.totalBunnies == 0){
            this.gameover = true;
            this.music.stop();
            this.countdown.setText('Bunnies Left 0');
            this.overmessage = this.add.bitmapText(this.world.centerX-180, this.world.centerY-40, 'eightbitwonder', 'GAME OVER\n\n' + this.secondsElapsed, 42);
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true;
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
        }else {
            this.countdown.setText('Bunnies Left ' + this.totalBunnies);
        }
    },

    quitGame:function(pointer) {
        this.ding.play();
        this.state.start('StartMenu');
    },
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buildSpaceRocks: function() {
        this.spacerockgroup = this.add.group();
        for(var i=0; i<this.totalSpacerocks; i++) {
            var rock = this.spacerockgroup.create(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0), 'spacerock', 'SpaceRock0000');
            var scale = this.rnd.realInRange(0.3, 1.0);
            rock.scale.x = scale;
            rock.scale.y = scale;
            this.physics.enable(rock, Phaser.Physics.ARCADE);
            rock.enableBody = true;
            rock.body.velocity.y = this.rnd.integerInRange(200, 400);
            rock.animations.add('Fall');
            rock.animations.play('Fall', 24, true);
            rock.checkWorldBounds = true;
            rock.events.onOutOfBounds.add(this.resetRock, this);
        }
    },


    resetRock: function(rock) {
        if(rock.y > this.world.height) {
            this.respawnRock(rock);
        }
    },

    respawnRock: function(rock) {//rock wiederherstellen, dass er wieder von oben runter kommt
        if(this.gameover == false){
            rock.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
            rock.body.velocity.y = this.rnd.integerInRange(200, 400);
        }
    },



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







    buildEmitter:function() {//explosion bilder
        this.burst = this.add.emitter(0, 0, 80);
        this.burst.minParticleScale = 0.3;
        this.burst.maxParticleScale = 1.2;
        this.burst.minParticleSpeed.setTo(-30, 30);
        this.burst.maxParticleSpeed.setTo(30, -30);
        this.burst.makeParticles('explosion');
        this.input.onDown.add(this.fireBurst, this);
    },

    fireBurst: function(pointer) {
        if(this.gameover == false){
            this.boom.play();
            this.boom.volume = 0.2;
            this.burst.emitX = pointer.x;
            this.burst.emitY = pointer.y;
            this.burst.start(true, 200, null, 20);
        }
    },


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    burstCollision: function(rock, bunny) {//wenn rock bunny killt kommt er wieder von oben
        this.respawnRock(rock);
    },

    bunnyCollision: function(rock, bunny) {//bunny and rock collision
        if(bunny.exists){
            this.ouch.play();
            this.respawnRock(rock);
            this.makeGhost(bunny);
            bunny.kill();
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },

    friendlyFire: function(bunny){
        if(bunny.exists){
            this.ouch.play();
            this.makeGhost(bunny);
            bunny.kill();
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },

    makeGhost: function(bunny) {
        bunnyghost = this.add.sprite(bunny.x-20, bunny.y-180, 'ghost');
        bunnyghost.anchor.setTo(0.5, 0.5);
        bunnyghost.scale.x = bunny.scale.x;
        this.physics.enable(bunnyghost, Phaser.Physics.ARCADE);
        bunnyghost.enableBody = true;
        bunnyghost.checkWorldBounds = true;
        bunnyghost.body.velocity.y = -800;
    },

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//end of game quit the game


    update: function() {//update means constantly checking
            this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
            this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
            this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);
        }




};
