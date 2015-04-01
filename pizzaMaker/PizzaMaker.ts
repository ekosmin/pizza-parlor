///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../pizza/PizzaSprite.ts"/>
///<reference path="../Level.ts"/>
///<reference path="PizzaMakerMachine.ts"/>
///<reference path="PizzaMakerButton.ts"/>
module Main {

    export class PizzaMaker extends Phaser.Group {

        private machine: PizzaMakerMachine;
        private button: PizzaMakerButton;

        private static BUTTON_OFFSET: number = 50;

        constructor(level: Level, x: number, y: number) {
            super(level.game);
            this.x = x;
            this.y = y;

            this.machine = new PizzaMakerMachine(level, 0, 0);
            this.button = new PizzaMakerButton(this.machine, level,
                this.machine.width/2 - PizzaMaker.BUTTON_OFFSET, this.machine.height/2);

            this.add(this.machine);
            this.add(this.button);
        }

    }
}