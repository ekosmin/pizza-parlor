///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="PizzaSprite.ts"/>
///<reference path="Level.ts"/>
module Main {

    export class Pizza extends Phaser.Group {

        private level: Level;

        public isServed: boolean = false;
        public amount: number;

        private static START_POINT: Phaser.Point = new Phaser.Point(100, 415);
        private static HEIGHT: number = 15;

        // Used for dragging the full group
        mouseDragStart: Phaser.Point;
        groupDragStart: Phaser.Point;
        isDragged: boolean;

        constructor(level: Level) {
            super(level.game);
            this.level = level;

            this.x = Pizza.START_POINT.x;
            this.y = Pizza.START_POINT.y;
            this.setAmount(1);
        }

        public update(): void {
            if (this.isDragged) {
                // Find how far the mouse has moved since the start of the drag
                var xOffset: number = this.level.game.input.x - this.mouseDragStart.x;
                var yOffset: number = this.level.game.input.y - this.mouseDragStart.y;

                // Then move the whole group by the same amount
                this.x = this.groupDragStart.x + xOffset;
                this.y = this.groupDragStart.y + yOffset;
            }
        }

        public onDragStart(): void {
            this.mouseDragStart = new Phaser.Point(this.level.game.input.x, this.level.game.input.y);
            this.groupDragStart = new Phaser.Point(this.x, this.y);
            this.isDragged = true;
        }

        public onDragStop(): void {
            this.isDragged = false;
        }

        public setAmount(amount: number): void {
            this.amount = amount;

            for (var i: number = 0; i < amount; i++) {
                this.add(new PizzaSprite(this.level, this, 0, i * -Pizza.HEIGHT));
            }
        }
    }
}