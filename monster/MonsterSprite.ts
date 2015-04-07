///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>

module Main {

    export class MonsterSprite extends Phaser.Sprite {

        private level: Level;

        private heads: number;

        constructor(level:Level, heads: number) {
            super(level.game, 0, 0, MonsterSprite.chooseSprite(heads, false), 0);
            this.heads = heads;
            this.level = level;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);
        }

        public eatPizza(): void {
            this.loadTexture(MonsterSprite.chooseSprite(this.heads, true));
        }

        private static chooseSprite(heads: number, isServed: boolean): string {
            var assetSuffix: string = isServed ? "happy" : "sad";
            return heads + "head_" + assetSuffix;
        }
    }
}