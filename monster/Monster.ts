///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="../Level.ts"/>
///<reference path="../pizza/Pizza.ts"/>
///<reference path="MonsterSprite.ts"/>
module Main {

    export class Monster extends Phaser.Group {

        public isServed: boolean = false;

        private level: Level;

        private monsterSprite: MonsterSprite;
        private amount: Fraction;

        constructor(level:Level, heads: number, amount: Fraction, x:number, y:number) {
            super(level.game);
            this.level = level;
            this.amount = amount;
            this.x = x;
            this.y = y;

            this.monsterSprite = new MonsterSprite(level, heads);
            this.add(this.monsterSprite);
        }

        public servePizza(pizza: Pizza): void {
            if (pizza.amount.equals(this.amount)) {
                this.monsterSprite.eatPizza();
                this.isServed = true;
            }
            this.level.chomp.play();
            pizza.destroy();
        }

    }
}