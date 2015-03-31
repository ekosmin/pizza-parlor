///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Level.ts"/>
///<reference path="Pizza.ts"/>
module Main {

    export class PizzaMultiplier extends Phaser.Sprite {

        private level: Level;

        constructor(level:Level, x:number, y:number) {
            super(level.game, x, y, 'multiplier', 1);
            this.level = level;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);

            this.body.setSize(200, 100, 0, 75);
        }

    }
}