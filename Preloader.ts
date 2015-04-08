///<reference path="phaser/typescript/phaser.d.ts"/>
module Main {

    export class Preloader extends Phaser.State {

        private chomp: Phaser.Sound;

        preload() {
            this.load.image('pizza', 'assets/pizza.png');
            this.load.image('pizzaMaker', 'assets/pizzaMaker.png');
            this.load.image('multiplier', 'assets/multiplier.png');
            this.load.image('level1', 'assets/level1.png');
            this.load.image('multiplierButton', 'assets/multiplierButton.png');
            this.load.image('makerButton', 'assets/makerButton.png');

            this.load.audio('chomp', 'assets/chomp.wav');

            this.game.load.atlasJSONHash(
                'monsterSheet',
                'assets/monsterSheet.png',
                'assets/monsterSheet.json'
            );
        }

        create() {
            this.chomp = this.game.add.audio('chomp');
            this.game.sound.setDecodedCallback([this.chomp], this.start, this);
        }

        private start(): void {
            this.game.state.start('Level', true, false, this.chomp);
        }

    }

}