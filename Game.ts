///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Boot.ts"/>
///<reference path="Preloader.ts"/>
///<reference path="Level.ts"/>
///<reference path="Level2.ts"/>
module Main {

    export class Game extends Phaser.Game {

        constructor() {

            super(1200, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Boot, false);
            this.state.add('Preloader', Preloader, false);
            this.state.add('Level', Level, false);
            this.state.add('Level2', Level2, false);

            this.state.start('Boot');

        }

    }

    window.onload = ( )=> {
        var game = new Game();
    }

}