"use strict";

export default class Comparator<T> {
    public compare: (a: T, b: T) => number;

    /**
     * @param {function(a: T, b: T)} [compareFunction]
     */
    constructor(compareFunction?: (a: T, b: T) => number) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    static defaultCompareFunction(a: any = undefined, b: any = undefined): number {
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    equal(a: T, b: T): boolean {
        return this.compare(a, b) === 0;
    }

    lessThan(a: T, b: T): boolean {
        return this.compare(a, b) < 0;
    }

    greaterThan(a: T, b: T): boolean {
        return this.compare(a, b) > 0;
    }

    lessThanOrEqual(a: T, b: T): boolean {
        return this.lessThan(a, b) || this.equal(a, b);
    }

    greaterThanOrEqual(a: T, b: T): boolean {
        return this.greaterThan(a, b) || this.equal(a, b);
    }

    reverse(): void {
        const compareOriginal = this.compare;
        this.compare = (a: T, b: T) => compareOriginal(b, a);
    }
}