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
        public nextLevelButton: NextLevelButton;

        private background: Phaser.Sprite;
        private levelGroup: Phaser.Group;

        private static NEXT_BUTTON_POINT: Phaser.Point = new Phaser.Point(10, 500);
        private static MAKER_POINT: Phaser.Point = new Phaser.Point(-125, 0);
        private static MULTIPLIER_START_POINT: Phaser.Point = new Phaser.Point(225, 15);
        private static MONSTER_START_POINT: Phaser.Point = new Phaser.Point(450, 265);

        private static MULTIPLIER_OFFSET: number = 475;
        private static MONSTERS_PER_ROW: number = 3;

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
                var amount: Fraction = this.getDesiredFood(heads[i], basePizzaAmount)
                var origin = this.getMonsterPoint(i);

                var monster = new Monster(this, heads[i], amount, origin.x, origin.y);
                this.monsters.add(monster);
            }

            // Serve monsters after to preserve spacing
            for (var i: number = 0; i < isServed.length; i++) {
                var monster: Monster = this.monsters.getAt(i);
                var amount: Fraction = this.getDesiredFood(heads[i], basePizzaAmount);
                if (isServed[i]) {
                    var pizza = new Pizza(this, amount, monster.x, monster.y, false);
                    this.pizzas.add(pizza);
                    monster.servePizza(pizza, false);
                }
            }
        }

        private getMonsterPoint(index: number): Phaser.Point {
            if (index == 0) {
                return Level.MONSTER_START_POINT;
            }

            if (index % Level.MONSTERS_PER_ROW == 0) {
                var monsterAbove: Monster = this.monsters.getAt(index - Level.MONSTERS_PER_ROW);
                return new Phaser.Point(monsterAbove.x, monsterAbove.y + monsterAbove.height);
            }

            var lastMonster: Monster = this.monsters.getAt(index - 1);
            return new Phaser.Point(lastMonster.x + lastMonster.width + Pizza.MAX_WIDTH, lastMonster.y);
        }

        private getDesiredFood(heads: number, baseAmount: Fraction): Fraction {
            return baseAmount.multiply(new Fraction(heads));
        }

    }

}