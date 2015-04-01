///<reference path="../build/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
module Main {

    export class MultiplierButton extends Phaser.Sprite {

        private parentMachine: MultiplierMachine;

        constructor(multiplier: MultiplierMachine, level:Level, x:number, y:number) {
            super(level.game, x, y, 'multiplierButton');
            this.parentMachine = multiplier;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.multiplyPizza, this);
        }

        private multiplyPizza(): void {
            this.parentMachine.multiplyPizza();
        }

    }
}