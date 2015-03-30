///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="PizzaSprite.ts"/>

module Main {

    export class Pizza extends Phaser.Group {

        constructor(level: Level) {
            super(level.game);

            this.add(new PizzaSprite(level, 0, 0));
            this.add(new PizzaSprite(level, 50, 0));
        }

        public updatePizzas(offset: Phaser.Point) {
            this.x = offset.x;
            this.y = offset.y;
        }
    }
}