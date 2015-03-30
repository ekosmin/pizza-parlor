///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Draggable.ts"/>


module Main {

    export class DraggableGroup extends Phaser.Group implements Draggable {
        mouseStart: number;
        objectStart: number;
        isDragged: boolean;

        constructor(public mouseStart: number, public objectStart: number, public isDragged: boolean, game: Phaser.Game) {
            super(game);
        }

        startDragging(): void {}
        stopDragging(): void {}
    }
}