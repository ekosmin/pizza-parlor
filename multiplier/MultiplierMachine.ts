///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
///<reference path="MultiplierButton.ts"/>
module Main {

    export class MultiplierMachine extends Phaser.Sprite {

        private level: Level;

        private multiplier: number;

        private static WIDTH = 600;

        constructor(multiplier: number, level:Level, x:number, y:number) {
            super(level.game, x, y, 'multiplier');
            this.level = level;
            this.multiplier = multiplier;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.setSize(200, 100, 0, 75);
        }

        public multiplyPizza(): void {
            for (var i: number = 0; i < this.level.pizzas.length; i++) {
                var pizza: Pizza = this.level.pizzas.getAt(i);
                if (this.level.physics.arcade.overlap(pizza, this)) {
                    pizza.setAmount(pizza.amount * this.multiplier);
                    pizza.x = this.parent.x + MultiplierMachine.WIDTH;
                }
            }
        }

    }
}