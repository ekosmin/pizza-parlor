///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Pizza.ts"/>
///<reference path="PizzaMaker.ts"/>
module Main {

    export class Level extends Phaser.State {

        levelGroup: Phaser.Group;

        pizzas: Phaser.Group;

        create() {
            this.levelGroup = this.game.add.group();

            this.levelGroup.add(new PizzaMaker(this, -100, 0));

            this.pizzas = new Phaser.Group(this.game);
            this.levelGroup.add(this.pizzas);
        }

    }

}