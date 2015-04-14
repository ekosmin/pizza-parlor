///<reference path="phaser/typescript/phaser.d.ts"/>
///<reference path="Fraction.ts"/>
module Main {

    export class LevelSettings {

        private static instance: LevelSettings = null;

        private basePizzaAmount: Fraction;
        private multipliers: Fraction[];
        private heads: number[];
        private isServed: boolean[];

        private level: number = -1; // so the first level is 0

        constructor() {
            if (LevelSettings.instance) {
                throw new Error("Error: instantiation failed. Use LevelSettings.nextLevel() to obtain the next level");
            }
            LevelSettings.instance = this;
        }

        public getBasePizzaAmount(): Fraction {
            return this.basePizzaAmount;
        }

        public getMultipliers(): Fraction[] {
            return this.multipliers;
        }

        public getHeads(): number[] {
            return this.heads;
        }

        public getServed(): boolean[] {
            return this.isServed;
        }

        private advanceLevel(basePizzaAmount: Fraction, multipliers: Fraction[], heads: number[],
                             isServed: boolean[]): LevelSettings {
            this.basePizzaAmount = basePizzaAmount;
            this.multipliers = multipliers;
            this.heads = heads;
            this.isServed = isServed;

            return this;
        }

        private static getInstance(): LevelSettings {
            if (LevelSettings.instance === null) {
                LevelSettings.instance = new LevelSettings();
            }
            return LevelSettings.instance;
        }

        public static nextLevel(): LevelSettings {
            var settings: LevelSettings = LevelSettings.getInstance();
            settings.level += 1;
            switch (settings.level) {
                case 0:
                    return settings.advanceLevel(new Fraction(1, 4),
                                                [new Fraction(1, 2)],
                                                [4, 4, 2],
                                                [true, false, false]);
                case 1:
                default:
                    return settings.advanceLevel(new Fraction(1, 2),
                                                [new Fraction(3,2)],
                                                [2, 3],
                                                [false, true]);
            }
        }

    }

}