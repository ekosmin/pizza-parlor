///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>

module Main {

    export class PizzaSprite extends Phaser.Sprite {

        private level: Level;
        private parentGroup: Pizza;

        constructor(level:Level, parent: Pizza, x:number, y:number) {
            super(level.game, x, y, 'pizza', 0);
            this.level = level;
            this.parentGroup = parent;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);

            this.inputEnabled = true;
            this.events.onInputDown.add(this.onDragStart, this);
            this.events.onInputUp.add(this.onDragStop, this);
        }

        private onDragStart(): void {
            this.parentGroup.onDragStart();
        }

        private onDragStop(): void {
            this.parentGroup.onDragStop();
        }
    }
}