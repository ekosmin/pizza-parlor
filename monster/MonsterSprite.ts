///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>

module Main {

    export class MonsterSprite extends Phaser.Sprite {

        private level: Level;

        private heads: number;

        constructor(level:Level, heads: number) {
            super(level.game, 0, 0, 'monsterSheet', MonsterSprite.chooseSprite(heads, false));
            this.heads = heads;
            this.level = level;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);
        }

        public eatPizza(): void {
            this.loadTexture("monsterSheet", MonsterSprite.chooseSprite(this.heads, true));
        }

        private static chooseSprite(heads: number, isServed: boolean): string {
            var assetSuffix: string = isServed ? "happy" : "sad";
            return heads + "head_" + assetSuffix + ".png";
        }
    }
}