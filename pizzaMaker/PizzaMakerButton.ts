///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
module Main {

    export class PizzaMakerButton extends Phaser.Sprite {

        private parentMachine: PizzaMakerMachine;

        constructor(maker: PizzaMakerMachine, level:Level, x:number, y:number) {
            super(level.game, x, y, 'makerButton');
            this.parentMachine = maker;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.makePizza, this);
        }

        private makePizza(): void {
            this.parentMachine.makePizza();
        }

    }
}