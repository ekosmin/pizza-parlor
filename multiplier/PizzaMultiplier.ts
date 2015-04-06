///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../pizza/PizzaSprite.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../Fraction.ts"/>
///<reference path="MultiplierMachine.ts"/>
///<reference path="MultiplierButton.ts"/>
module Main {

    export class PizzaMultiplier extends Phaser.Group {

        private machine: MultiplierMachine;
        private button: MultiplierButton;

        private static BUTTON_OFFSET: number = 50;

        constructor(multiplier: Fraction, level: Level, x: number, y: number) {
            super(level.game);
            this.x = x;
            this.y = y;

            this.machine = new MultiplierMachine(multiplier, level, 0, 0);
            this.add(this.machine);

            this.button = new MultiplierButton(this.machine, level,
                this.machine.width/2 - PizzaMultiplier.BUTTON_OFFSET, this.machine.height/2);

            this.add(this.button);

            this.add(new Pizza(level, multiplier, this.machine.width/2 - Pizza.WIDTH,
                this.machine.height/4 - Pizza.HEIGHT, true));
        }

    }
}