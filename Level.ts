///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Pizza.ts"/>
module Main {

    export class Level extends Phaser.State {

        pizza: Pizza;

        create() {
            var levelGroup: Phaser.Group = this.game.add.group();

            this.pizza = new Pizza(this);
            levelGroup.add(this.pizza);
        }

    }

}