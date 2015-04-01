///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Level.ts"/>
///<reference path="Pizza.ts"/>
module Main {

    export class PizzaMultiplier extends Phaser.Sprite {

        private level: Level;

        private multiplier: number;

        private static WIDTH = 600;

        constructor(multiplier: number, level:Level, x:number, y:number) {
            super(level.game, x, y, 'multiplier', 1);
            this.level = level;
            this.multiplier = multiplier;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.setSize(200, 100, 0, 75);

            this.inputEnabled = true;
            this.events.onInputDown.add(this.multiplyPizza, this);
        }

        private multiplyPizza(): void {
            for (var i: number = 0; i < this.level.pizzas.length; i++) {
                var pizza: Pizza = this.level.pizzas.getAt(i);
                if (this.level.physics.arcade.overlap(pizza, this)) {
                    pizza.setAmount(pizza.amount * this.multiplier);
                    pizza.x = this.x + PizzaMultiplier.WIDTH;
                }
            }
        }

    }
}