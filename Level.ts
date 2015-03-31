///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Pizza.ts"/>
///<reference path="PizzaMaker.ts"/>
///<reference path="PizzaMultiplier.ts"/>
module Main {

    export class Level extends Phaser.State {

        background: Phaser.Sprite;
        levelGroup: Phaser.Group;

        pizzas: Phaser.Group;

        create() {
            this.background = this.add.sprite(0, 0, 'level1');
            this.background.width = this.game.world.width;
            this.background.height = this.game.world.height;

            this.levelGroup = this.game.add.group();

            this.levelGroup.add(new PizzaMaker(this, -100, 0));
            this.levelGroup.add(new PizzaMultiplier(this, 350, 50));

            this.pizzas = new Phaser.Group(this.game);
            this.levelGroup.add(this.pizzas);
        }

    }

}