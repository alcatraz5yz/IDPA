Survive.Game = function(game) {

};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Survive.Game.prototype = {

    create: function() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);
        this.gameover = false;
//        this.totalPlayers = 1;
        this.totalStars = 8;
        this.totalSpacerocks = 3;
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.buildWorld();
    },
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    buildWorld: function() {
        this.add.sprite(0, 0, 'sky');
        platforms = this.add.group();
        platforms.enableBody = true;
         this.ground = platforms.create (0, this.world.height - 64, 'platform');
        this.ground.scale.setTo(2, 2);
        this.ground.body.immovable = true;
        this.ledge = platforms.create(350, 150, 'platform');
        this.ledge.body.immovable = true;
        this.ledge = platforms.create(-150, 290, 'platform');
        this.ledge.body.immovable = true;
        this.ledge = platforms.create(350, 490, 'platform');
        this.ledge.body.immovable = true;
        this.ledge = platforms.create(-150, 650, 'platform');
        this.ledge.body.immovable = true;
        this.ledge = platforms.create(350, 750, 'platform');
        this.ledge.body.immovable = true;




        this.player = this.add.sprite(32, this.world.height - 150, 'dude');
        this.physics.arcade.enable(this.player);
        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 300;
        this.player.body.collideWorldBounds = true;
        this.player.animations.add('left', [0, 1, 2, 3], 10, true);
        this.player.animations.add('right', [5, 6, 7, 8], 10, true);
//        this.playerCollision, null, this);








        this.stars = this.add.group();
        this.stars.enableBody = true;
        for (var i=0; i<this.totalStars; i++)
            {
        star = this.stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
            }
//
        this.buildSpaceRocks();
        this.buildEmitter();
    },
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

     collectStar: function(player, star) {
         star.kill();
         this.totalStars--;
         this.checkStarsLeft();
    },


//    collectPlayer: function(rock, player){
//            this.player.kill();
//
//
//           }




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buildSpaceRocks: function() {
        this.spacerockgroup = this.game.add.group();
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
            this.physics.arcade.overlap(this.player, rock,
            this.playerCollision, null, this);

        }
    },


    resetRock: function(rock) {
        if(rock.y > this.world.height) {
            this.respawnRock(rock);
        }
    },

    respawnRock: function(rock) {
        if(this.gameover == false){
            rock.reset(this.rnd.integerInRange(0, this.world.width), this.rnd.realInRange(-1500, 0));
            rock.body.velocity.y = this.rnd.integerInRange(200, 400);
        }
    },



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buildEmitter:function() {
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

   friendlyFire: function(player){
        if(this.player.exists){
            this.ouch.play();
            this.makeGhost(player);
            this.player.kill();
            this.checkPlayersLeft();

        }
    },






 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    burstCollision: function(rock, burst) {
        this.respawnRock(rock);
//        this.rock.kill();
    },

    playerCollision: function(spacerockgroup, player) {
//        if(this.totalPlayers == 1){
            this.ouch.play();
//            this.respawnRock(this.rock);
            this.makeGhost(this.player);
            this.player.kill();
            this.checkPlayersLeft();

//        }
    },


 checkStarsLeft: function(){
        if(this.totalStars == 0){
        this.gameover = true;
        this.music.stop();
        this.overmessage = this.add.bitmapText(this.world.centerX-180, this.world.centerY-40, 'eightbitwonder', 'you won\n\n');
        this.overmessage.align = "center";
        this.overmessage.inputEnabled = true;
        this.overmessage.events.onInputDown.addOnce(this.quitGame, this);

    }
    },



    checkPlayersLeft: function(){
//        if(this.totalPlayers == 0){
        this.gameover = true;
        this.music.stop();
        this.overmessage = this.add.bitmapText(this.world.centerX-180, this.world.centerY-40, 'eightbitwonder', 'GAME OVER\n\n');
        this.overmessage.align = "center";
        this.overmessage.inputEnabled = true;
        this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
//    }
    },





    quitGame:function(pointer) {
        this.ding.play();
        this.state.start('StartMenu');
    },



    makeGhost: function(player) {
        playerghost = this.add.sprite(player.x-20, player.y-180, 'ghost');
        playerghost.anchor.setTo(0.5, 0.5);
        playerghost.scale.x = player.scale.x;
        this.physics.enable(playerghost, Phaser.Physics.ARCADE);
        playerghost.enableBody = true;
        playerghost.checkWorldBounds = true;
        playerghost.body.velocity.y = -800;
    },

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    update: function() {
         this.physics.arcade.collide(this.player, platforms);
        this.physics.arcade.collide(this.stars, platforms);


        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown)
    {

        this.player.body.velocity.x = -150;
        this.player.animations.play('left');
   }
        else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 150;
        this.player.animations.play('right');
    }
        else
    {
        this.player.animations.stop();
        this.player.frame = 4;
    }
        if (this.cursors.up.isDown && this.player.body.touching.down)
    {
       this.player.body.velocity.y = -350;
    }



            this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
            this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
            this.physics.arcade.overlap(this.spacerockgroup, this.player, this.playerCollision, null, this);
//            this.physics.arcade.overlap(this.rock, this.playerCollision, null, this);
            this.physics.arcade.overlap(this.burst, this.friendlyFire, null, this);
        }




};
