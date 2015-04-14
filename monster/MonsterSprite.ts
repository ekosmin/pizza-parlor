///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>

module Main {

    export class MonsterSprite extends Phaser.Sprite {

        private level: Level;

        private amount: Fraction;
        private heads: number;
        public isServed: boolean = false;

        constructor(level:Level, amount: Fraction, heads: number) {
            super(level.game, 0, 0, 'monsterSheet', MonsterSprite.chooseSprite(heads, false));
            this.heads = heads;
            this.amount = amount;
            this.level = level;

            this.level.game.physics.enable(this, Phaser.Physics.ARCADE);
        }

        public eatPizza(pizza: Pizza, doChomp: boolean): void {
            if (pizza.amount.equals(this.amount)) {
                this.loadTexture("monsterSheet", MonsterSprite.chooseSprite(this.heads, true));
                this.isServed = true;
            }

            if (doChomp) {
                this.level.chomp.play();
            }
        }

        private static chooseSprite(heads: number, isServed: boolean): string {
            var assetPrefix: string = isServed ? "happy" : "sad";
            return assetPrefix + "/" + heads + "head" + ".png";
        }
    }
}