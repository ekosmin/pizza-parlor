///<reference path="../phaser/typescript/phaser.d.ts"/>

module Main {

    export class PizzaMask extends Phaser.Graphics {

        // For some reason, as you increase the size of the mask, the minimum angle increases.
        // This behavior can be seen in the Phaser examples as well: http://phaser.io/examples/v2/display/arc-details#gv
        // This value helps calculate the offset for this behavior
        private static MIN_OFFSET_SLOPE = .16;

        constructor(amount: number, level:Level, x:number, y:number) {
            super(level.game, x, y);

            this.beginFill(0xff0000);

            // The arc is calculated clockwise, but the mask is filled counterclockwise.
            // That is why we use smaller angles for larger amounts of pizza.
            // A conversion to radians is also necessary
            var maxAngle: number = (1 - amount) * 2 * Math.PI;
            this.arc(0, 0, 50, PizzaMask.MIN_OFFSET_SLOPE * amount, maxAngle, true);
        }

    }
}