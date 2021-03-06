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
        private static PIZZA_OFFSET: number = 75;

        constructor(multiplier: Fraction, level: Level, x: number, y: number) {
            super(level.game);
            this.x = x;
            this.y = y;

            this.machine = new MultiplierMachine(multiplier, level, 0, 0);
            this.add(this.machine);

            this.button = new MultiplierButton(this.machine, level,
                this.machine.width * 3/4 - PizzaMultiplier.BUTTON_OFFSET, this.machine.height/2);

            this.add(this.button);

            var pizza = new Pizza(level, multiplier, 0,
                this.machine.height / 4, true);
            // place it in the middle of the second half of the machine
            pizza.x = this.machine.width / 2 + (this.machine.width / 2 - pizza.getSafeWidth()) / 2;
            this.add(pizza);
        }

    }
}