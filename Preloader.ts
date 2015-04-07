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

            this.load.image('1head_sad', 'assets/monsters/sad/1head.png');
            this.load.image('2head_sad', 'assets/monsters/sad/2head.png');
            this.load.image('3head_sad', 'assets/monsters/sad/3head.png');
            this.load.image('4head_sad', 'assets/monsters/sad/4head.png');

            this.load.image('1head_happy', 'assets/monsters/happy/1head.png');
            this.load.image('2head_happy', 'assets/monsters/happy/2head.png');
            this.load.image('3head_happy', 'assets/monsters/happy/3head.png');
            this.load.image('4head_happy', 'assets/monsters/happy/4head.png');

            this.load.audio('chomp', 'assets/chomp.wav');
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