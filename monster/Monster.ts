///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
///<reference path="MonsterSprite.ts"/>
module Main {

    export class Monster extends Phaser.Group {

        private level: Level;

        private monsterSprite: MonsterSprite;
        private pizzaHistory: Pizza;

        constructor(level:Level, heads: number, amount: Fraction, x:number, y:number) {
            super(level.game);
            this.level = level;
            this.x = x;
            this.y = y;

            this.monsterSprite = new MonsterSprite(level, amount, heads);
            this.add(this.monsterSprite);
        }

        public servePizza(pizza: Pizza, doChomp: boolean): void {
            if (!this.monsterSprite.isServed) {
                this.monsterSprite.eatPizza(pizza, doChomp);

                if (this.pizzaHistory) {
                    this.pizzaHistory.destroy();
                }
                this.pizzaHistory = pizza;

                pizza.serve(this);
            }
        }

    }
}