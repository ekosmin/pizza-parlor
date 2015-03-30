///<reference path="build/typescript/phaser.d.ts"/>

module Main {
    export interface Draggable {
        mouseStart: number;
        objectStart: number;
        isDragged: boolean;

        startDragging(): void;
        stopDragging(): void;
    }
}
