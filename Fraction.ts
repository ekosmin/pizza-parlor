/*
 fraction.js
 A Javascript fraction library.

 Copyright (c) 2009  Erik Garrison <erik@hypervolu.me>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.

 */


/* Fractions */
/*
 *
 * Fraction objects are comprised of a numerator and a denomenator.  These
 * values can be accessed at fraction.numerator and fraction.denomenator.
 *
 * Fractions are always returned and stored in lowest-form normalized format.
 * This is accomplished via Fraction.normalize.
 *
 * The following mathematical operations on fractions are supported:
 *
 * Fraction.equals
 * Fraction.add
 * Fraction.subtract
 * Fraction.multiply
 * Fraction.divide
 *
 * These operations accept both numbers and fraction objects.  (Best results
 * are guaranteed when the input is a fraction object.)  They all return a new
 * Fraction object.
 *
 * Usage:
 *
 * TODO
 *
 */

/*
 * The Fraction constructor takes one of:
 *   an explicit numerator (integer) and denominator (integer),
 *   a string representation of the fraction (string),
 *   or a floating-point number (float)
 *
 * These initialization methods are provided for convenience.  Because of
 * rounding issues the best results will be given when the fraction is
 * constructed from an explicit integer numerator and denomenator, and not a
 * decimal number.
 *
 *
 * e.g. new Fraction(1, 2) --> 1/2
 *      new Fraction('1/2') --> 1/2
 *      new Fraction('2 3/4') --> 11/4  (prints as 2 3/4)
 *
 */
module Main {
    export class Fraction {
        numerator:number;
        denominator:number;

        constructor(numerator:number, denominator?:number) {
            /* double argument invocation */
            if (!(typeof denominator === 'undefined')) {
                if (typeof(numerator) === 'number' && typeof(denominator) === 'number') {
                    this.numerator = numerator;
                    this.denominator = denominator;
                }
                /* single-argument invocation */
            } else {
                var num = numerator; // swap variable names for legibility
                if (typeof(num) === 'number') {  // just a straight number init
                    this.numerator = num;
                    this.denominator = 1;
                }
            }
            this.normalize();
        }

        clone() {
            return new Fraction(this.numerator, this.denominator);
        }

        /* pretty-printer, converts fractions into whole numbers and fractions */
        toString() {
            var wholepart = Math.floor(this.numerator / this.denominator);
            var numerator = this.numerator % this.denominator;
            var denominator = this.denominator;
            var result = [];
            if (wholepart != 0)
                result.push(wholepart);
            if (numerator != 0)
                result.push(numerator + '/' + denominator);
            return result.length > 0 ? result.join(' ') : 0;
        }

        toNumber(): number {
            return this.numerator/this.denominator;
        }

        /* destructively rescale the fraction by some integral factor */
        rescale(factor) {
            this.numerator *= factor;
            this.denominator *= factor;
            return this;
        }


        add(b) {
            var a = this.clone();
            if (b instanceof Fraction) {
                b = b.clone();
            } else {
                b = new Fraction(b);
            }
            var td = a.denominator;
            a.rescale(b.denominator);
            b.rescale(td);

            a.numerator += b.numerator;

            return a.normalize();
        }


        subtract(b) {
            var a = this.clone();
            if (b instanceof Fraction) {
                b = b.clone();  // we scale our argument destructively, so clone
            } else {
                b = new Fraction(b);
            }
            var td = a.denominator;
            a.rescale(b.denominator);
            b.rescale(td);

            a.numerator -= b.numerator;

            return a.normalize();
        }


        multiply(b) {
            var a = this.clone();
            if (b instanceof Fraction) {
                a.numerator *= b.numerator;
                a.denominator *= b.denominator;
            } else if (typeof b === 'number') {
                a.numerator *= b;
            } else {
                return a.multiply(new Fraction(b));
            }
            return a.normalize();
        }

        divide(b) {
            var a = this.clone();
            if (b instanceof Fraction) {
                a.numerator *= b.denominator;
                a.denominator *= b.numerator;
            } else if (typeof b === 'number') {
                a.denominator *= b;
            } else {
                return a.divide(new Fraction(b));
            }
            return a.normalize();
        }

        equals(b) {
            if (!(b instanceof Fraction)) {
                b = new Fraction(b);
            }
            // fractions that are equal should have equal normalized forms
            var a = this.clone().normalize();
            var b = b.clone().normalize();

            return (a.numerator === b.numerator && a.denominator === b.denominator);
        }


        /* Utility functions */

        /* Destructively normalize the fraction to its smallest representation.
         * e.g. 4/16 -> 1/4, 14/28 -> 1/2, etc.
         * This is called after all math ops.
         */
        normalize(): Fraction {

            var isFloat = function (n) {
                return (typeof(n) === 'number' &&
                ((n > 0 && n % 1 > 0 && n % 1 < 1) ||
                (n < 0 && n % -1 < 0 && n % -1 > -1))
                );
            };

            var roundToPlaces = function (n, places) {
                if (!places) {
                    return Math.round(n);
                } else {
                    var scalar = Math.pow(10, places);
                    return Math.round(n * scalar) / scalar;
                }
            };

            if (isFloat(this.denominator)) {
                var rounded = roundToPlaces(this.denominator, 9);
                var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
                this.denominator = Math.round(this.denominator * scaleup); // this !!! should be a whole number
                //this.numerator *= scaleup;
                this.numerator *= scaleup;
            }

            if (isFloat(this.numerator)) {
                var rounded = roundToPlaces(this.numerator, 9);
                var scaleup = Math.pow(10, rounded.toString().split('.')[1].length);
                this.numerator = Math.round(this.numerator * scaleup); // this !!! should be a whole number
                //this.numerator *= scaleup;
                this.denominator *= scaleup;
            }

            var gcf = Fraction.gcf(this.numerator, this.denominator);
            this.numerator /= gcf;
            this.denominator /= gcf;
            return this;
        }

        public isWhole() {
            return !(this.toNumber() - Math.floor(this.toNumber()) > 0);
        }


        /* Takes two numbers and returns their greatest common factor.
         */
        static gcf(a, b) {

            var common_factors = [];
            var fa = Fraction.primeFactors(a);
            var fb = Fraction.primeFactors(b);
            // for each factor in fa
            // if it's also in fb
            // put it into the common factors
            fa.forEach(function (factor) {
                var i = fb.indexOf(factor);
                if (i >= 0) {
                    common_factors.push(factor);
                    fb.splice(i, 1); // remove from fb
                }
            });

            if (common_factors.length === 0)
                return 1;

            var gcf = (function () {
                var r = common_factors[0];
                var i;
                for (i = 1; i < common_factors.length; i++) {
                    r = r * common_factors[i];
                }
                return r;
            })();

            return gcf;

        }


        // Adapted from:
        // http://www.btinternet.com/~se16/js/factor.htm
        static primeFactors(n) {

            var num = n;
            var factors = [];
            var _factor = 2;  // first potential prime factor

            while (_factor * _factor <= num)  // should we keep looking for factors?
            {
                if (num % _factor === 0)  // this is a factor
                {
                    factors.push(_factor);  // so keep it
                    num = num / _factor;  // and divide our search point by it
                }
                else {
                    _factor++;  // and increment
                }
            }

            if (num != 1)                    // If there is anything left at the end...
            {                                // ...this must be the last prime factor
                factors.push(num);           //    so it too should be recorded
            }

            return factors;                  // Return the prime factors
        }
    }
}