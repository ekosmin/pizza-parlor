///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="pizza/Pizza.ts"/>
///<reference path="pizzaMaker/PizzaMaker.ts"/>
///<reference path="multiplier/PizzaMultiplier.ts"/>
///<reference path="monster/Monster.ts"/>
///<reference path="Fraction.ts"/>
module Main {

    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        levelGroup: Phaser.Group;

        pizzas: Phaser.Group;
        monsters: Phaser.Group;

        chomp: Phaser.Sound;

        init(chomp?: Phaser.Sound) {
            this.chomp = chomp;
        }

        create() {
            this.background = this.add.sprite(0, 0, 'level1');
            this.background.width = this.game.world.width;
            this.background.height = this.game.world.height;

            this.levelGroup = this.game.add.group();

            this.levelGroup.add(new PizzaMaker(this, -100, 0));
            this.levelGroup.add(new PizzaMultiplier(new Fraction(3, 2), this, 350, 50));

            this.monsters = new Phaser.Group(this.game);
            this.levelGroup.add(this.monsters);
            this.monsters.add(new Monster(this, 2, new Fraction(3, 2), 300, 300));

            this.pizzas = new Phaser.Group(this.game);
            this.levelGroup.add(this.pizzas);
        }

    }

}