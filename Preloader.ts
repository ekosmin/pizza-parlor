///<reference path="build/typescript/phaser.d.ts"/>
module Main {

    export class Preloader extends Phaser.State {

        preload() {
            this.load.image('pizza', 'assets/pizza.png');
        }

        create() {
            this.game.state.start('Level', true, false);
        }

    }

}