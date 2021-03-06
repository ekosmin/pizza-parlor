///<reference path="../phaser/typescript/phaser.d.ts"/>
///<reference path="PizzaSprite.ts"/>
///<reference path="PizzaMask.ts"/>
///<reference path="../Level.ts"/>
module Main {

    export class Pizza extends Phaser.Group {

        private level: Level;

        public isServed: boolean = false;
        public amount: Fraction;

        public static MAX_WIDTH: number = 190;

        private static MASK_OFFSET: Phaser.Point = new Phaser.Point(50, 31);

        // Values for a single Pizza, for placement within the group
        private static WIDTH: number = 90;
        private static HEIGHT: number = 15;

        // Used for dragging the full group
        mouseDragStart: Phaser.Point;
        groupDragStart: Phaser.Point;
        isDragged: boolean;

        constructor(level: Level, amount: Fraction, x: number, y: number, isServed?: boolean) {
            super(level.game);
            this.level = level;
            this.x = x;
            this.y = y;
            this.setAmount(amount);
            this.isServed = isServed;
        }

        public update(): void {
            if (this.isDragged) {
                // Find how far the mouse has moved since the start of the drag
                var xOffset: number = this.level.game.input.x - this.mouseDragStart.x;
                var yOffset: number = this.level.game.input.y - this.mouseDragStart.y;

                // Then move the whole group by the same amount
                this.x = this.groupDragStart.x + xOffset;
                this.y = this.groupDragStart.y + yOffset;
            }
        }

        public onDragStart(): void {
            if (!this.isServed) {
                this.mouseDragStart = new Phaser.Point(this.level.game.input.x, this.level.game.input.y);
                this.groupDragStart = new Phaser.Point(this.x, this.y);
                this.isDragged = true;
            }
        }

        public onDragStop(): void {
            this.isDragged = false;

            // is the pizza getting served to a monster?
            for (var i: number = 0; i < this.level.monsters.length; i++) {
                var monster: Monster = this.level.monsters.getAt(i);
                if (this.level.physics.arcade.overlap(this, monster)) {
                    monster.servePizza(this, true);
                }
            }
        }

        // XXX: Hack to avoid calling this.width during setup, which causes a masking error.
        // Reproduce by replacing the body of this method with "return this.width"
        public getSafeWidth(): number {
            var oneStack = this.amount.isWhole() || this.amount.toNumber() < 1;
            return oneStack ? Pizza.WIDTH : Pizza.WIDTH * 2;
        }

        public setAmount(amount: Fraction): void {
            this.amount = amount;
            this.removeAll(true);

            var wholePizzas: number = Math.floor(amount.toNumber());

            for (var i: number = 0; i < wholePizzas; i++) {
                this.add(new PizzaSprite(this.level, this, 0, i * -Pizza.HEIGHT));
            }

            var style = { font: "15px Arial", fill: "#000000", align: "center" };
            if (wholePizzas != 0) {
                this.add(new Phaser.Text(this.level.game, Pizza.WIDTH/2, wholePizzas * -Pizza.HEIGHT,
                    "" + wholePizzas, style));
            }

            var remainder: Fraction = amount.subtract(new Fraction(wholePizzas));
            if (remainder.toNumber() != 0) {
                var xOffset: number = amount.toNumber() < 1 ? 0 : Pizza.WIDTH; // No offset if no whole pizza stack
                var fractionalPizza: PizzaSprite = new PizzaSprite(this.level, this, xOffset, 0);
                this.add(fractionalPizza);

                var mask: PizzaMask = new PizzaMask(remainder, this.level,
                    fractionalPizza.x + Pizza.MASK_OFFSET.x, Pizza.MASK_OFFSET.y);
                fractionalPizza.mask = mask;
                this.add(mask);

                this.add(new Phaser.Text(this.level.game, xOffset + Pizza.WIDTH * .5, -Pizza.HEIGHT, "" + remainder,
                    style));
            }
        }

        public serve(monster: Monster): void {
            this.x = monster.x - this.getSafeWidth();
            this.y = monster.y + monster.height/2;
            this.isServed = true;
        }
    }
}