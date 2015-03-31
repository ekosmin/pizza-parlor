///<reference path="build/typescript/phaser.d.ts"/>
///<reference path="Pizza.ts"/>
module Main {

    export class Level extends Phaser.State {

        pizza: Pizza;

        create() {

            this.pizza = new Pizza(this);
        }

    }

}