///<reference path="build/typescript/phaser.d.ts"/>
module Main {

    export class PizzaSprite extends Phaser.Sprite {

        private level: Level;

        constructor(level:Level, x:number, y:number) {
            super(level.game, x, y, 'pizza', 0);
            this.level = level;

            this.inputEnabled = true;

            this.events.onInputDown.add(this.onDragStart, this);
            this.events.onInputUp.add(this.onDragStop, this);
        }

        private onDragStart(): void {
            this.level.pizza.onDragStart();
        }

        private onDragStop(): void {
            this.level.pizza.onDragStop();
        }
    }
}