///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Level.ts"/>
module Main {

    export class NextLevelButton extends Phaser.Sprite {

        private level: Level;

        constructor(level:Level, x:number, y:number) {
            super(level.game, x, y, 'multiplierButton');
            this.level = level;

            this.inputEnabled = true;
            this.events.onInputDown.add(this.nextLevel, this);
        }

        private nextLevel(): void {
            this.game.state.start('Level', true, false, this.level.chomp);
            this.level.nextLevelButton = null;
        }

    }
}