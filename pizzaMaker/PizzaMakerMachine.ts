///<reference path="../build/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
module Main {

    export class PizzaMakerMachine extends Phaser.Sprite {

        private level: Level;

        constructor(level:Level, x:number, y:number) {
            super(level.game, x, y, 'pizzaMaker', 1);
            this.level = level;
        }

        public makePizza(): void {
            for (var i: number = 0; i < this.level.pizzas.length; i++) {
                if (!this.level.pizzas.getAt(i).isServed) {
                    // Only allow one unserved pizza at a time
                    return;
                }
            }
            var pizza: Pizza = new Pizza(this.level);
            this.level.pizzas.add(pizza);
        }
    }
}