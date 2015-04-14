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

        public pizzas: Phaser.Group;
        public monsters: Phaser.Group;
        public machines: Phaser.Group;

        public chomp: Phaser.Sound;

        private background: Phaser.Sprite;
        private levelGroup: Phaser.Group;
        private nextLevelButton: NextLevelButton;

        private static NEXT_BUTTON_POINT: Phaser.Point = new Phaser.Point(950, 400);
        private static MAKER_POINT: Phaser.Point = new Phaser.Point(-125, 0);
        private static MULTIPLIER_START_POINT: Phaser.Point = new Phaser.Point(225, 50);
        private static MONSTER_START_POINT: Phaser.Point = new Phaser.Point(450, 350);

        private static MULTIPLIER_OFFSET: number = 475;
        private static MONSTER_OFFSET: number = 350;

        init(chomp?: Phaser.Sound) {
            this.chomp = chomp;
        }

        create() {
            this.background = this.add.sprite(0, 0, 'level1');
            this.background.width = this.game.world.width;
            this.background.height = this.game.world.height;

            this.levelGroup = this.game.add.group();
            this.monsters = new Phaser.Group(this.game);
            this.pizzas = new Phaser.Group(this.game);
            this.machines = new Phaser.Group(this.game);

            this.levelGroup.add(this.machines);
            this.levelGroup.add(this.monsters);
            this.levelGroup.add(this.pizzas);

            var settings:LevelSettings = LevelSettings.nextLevel();

            this.machines.add(new PizzaMaker(this, Level.MAKER_POINT.x, Level.MAKER_POINT.y));
            this.addMultipliers(settings.getMultipliers());
            this.addMonsters(settings.getHeads(), settings.getServed(), settings.getBasePizzaAmount());
        }

        update() {
            for (var i: number = 0; i < this.monsters.length; i++) {
                if (!this.monsters.getAt(i).monsterSprite.isServed) {
                    return;
                }
            }
            if (!this.nextLevelButton) {
                this.nextLevelButton = new NextLevelButton(this, Level.NEXT_BUTTON_POINT.x, Level.NEXT_BUTTON_POINT.y);
                this.levelGroup.add(this.nextLevelButton);
            }
        }

        private addMultipliers(multipliers: Fraction[]) {
            for (var i: number = 0; i < multipliers.length; i++) {
                this.machines.add(new PizzaMultiplier(multipliers[i],
                                                      this,
                                                      Level.MULTIPLIER_START_POINT.x + i * Level.MULTIPLIER_OFFSET,
                                                      Level.MULTIPLIER_START_POINT.y));
            }
        }

        private addMonsters(heads: number[], isServed: boolean[], basePizzaAmount: Fraction) {
            for (var i: number = 0; i < heads.length; i++) {
                var headNumber: number = heads[i];
                var amount: Fraction = basePizzaAmount.multiply(new Fraction(headNumber));
                var monster = new Monster(this,
                    headNumber,
                    amount,
                    Level.MONSTER_START_POINT.x + i * Level.MONSTER_OFFSET,
                    Level.MONSTER_START_POINT.y);
                this.monsters.add(monster);

                if (isServed[i]) {
                    var pizza = new Pizza(this, amount, monster.x, monster.y, false);
                    this.pizzas.add(pizza);
                    monster.servePizza(pizza, false);
                }
            }
        }

    }

}