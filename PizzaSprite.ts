///<reference path="build/typescript/phaser.d.ts"/>
module Main {

    export class PizzaSprite extends Phaser.Sprite {

        private level: Level;

        private isDragged: boolean = false;
        private mouseDragStart: Phaser.Point;
        private groupDragStart: Phaser.Point;

        constructor(level:Level, x:number, y:number) {
            super(level.game, x, y, 'pizza', 0);
            this.level = level;

            this.inputEnabled = true;

            this.events.onInputDown.add(this.onDragStart, this);
            this.events.onInputUp.add(this.onDragStop, this);
        }

        public update(): void {
            if (this.isDragged) {
                var mouseOffset: Phaser.Point = new Phaser.Point(this.level.game.input.x - this.mouseDragStart.x,
                                                                 this.level.game.input.y - this.mouseDragStart.y);

                this.level.pizza.updatePizzas(new Phaser.Point(this.groupDragStart.x + mouseOffset.x,
                                                               this.groupDragStart.y + mouseOffset.y));
            }
        }

        private onDragStart(): void {
            this.mouseDragStart = new Phaser.Point(this.level.game.input.x, this.level.game.input.y);
            this.groupDragStart = new Phaser.Point(this.level.pizza.x , this.level.pizza.y);
            this.isDragged = true;
        }

        private onDragStop(): void {
            this.isDragged = false;
        }
    }
}