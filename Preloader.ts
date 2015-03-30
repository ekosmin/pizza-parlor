///<reference path="build/typescript/phaser.d.ts"/>
module Main {

    export class Preloader extends Phaser.State {

        preload() {
        }

        create() {
            this.game.state.start('Level', true, false);
        }

    }

}