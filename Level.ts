///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="pizza/Pizza.ts"/>
///<reference path="pizzaMaker/PizzaMaker.ts"/>
///<reference path="multiplier/PizzaMultiplier.ts"/>
///<reference path="monster/Monster.ts"/>
///<reference path="Fraction.ts"/>
///<reference path="NextLevelButton.ts"/>
///<reference path="LevelSettings.ts"/>
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

            var settings:LevelSettings = LevelSettings.nextLevel();

            this.levelGroup.add(new PizzaMaker(this, -125, 0));
            this.levelGroup.add(new PizzaMultiplier(settings.getMultipliers()[0], this, 225, 50));
            this.levelGroup.add(new PizzaMultiplier(settings.getMultipliers()[0], this, 700, 50));

            this.monsters = new Phaser.Group(this.game);
            this.levelGroup.add(this.monsters);

            var amount1: Fraction = settings.getBasePizzaAmount().multiply(new Fraction(settings.getMonsters()[0]));
            var amount2: Fraction = settings.getBasePizzaAmount().multiply(new Fraction(settings.getMonsters()[1]));
            this.monsters.add(new Monster(this, settings.getMonsters()[0], amount1, 450, 350));
            this.monsters.add(new Monster(this, settings.getMonsters()[1], amount2, 650, 350));

            this.pizzas = new Phaser.Group(this.game);
            this.levelGroup.add(this.pizzas);
        }

        update() {
            for (var i: number = 0; i < this.monsters.length; i++) {
                if (!this.monsters.getAt(i).isServed) {
                    return;
                }
            }
            this.levelGroup.add(new NextLevelButton(this, 800, 400));
        }

    }

}