"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Comparator = /** @class */ (function () {
    /**
     * @param {function(a: T, b: T)} [compareFunction]
     */
    function Comparator(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }
    Comparator.defaultCompareFunction = function (a, b) {
        if (a === void 0) { a = undefined; }
        if (b === void 0) { b = undefined; }
        if (a === b) {
            return 0;
        }
        return a < b ? -1 : 1;
    };
    Comparator.prototype.equal = function (a, b) {
        return this.compare(a, b) === 0;
    };
    Comparator.prototype.lessThan = function (a, b) {
        return this.compare(a, b) < 0;
    };
    Comparator.prototype.greaterThan = function (a, b) {
        return this.compare(a, b) > 0;
    };
    Comparator.prototype.lessThanOrEqual = function (a, b) {
        return this.lessThan(a, b) || this.equal(a, b);
    };
    Comparator.prototype.greaterThanOrEqual = function (a, b) {
        return this.greaterThan(a, b) || this.equal(a, b);
    };
    Comparator.prototype.reverse = function () {
        var compareOriginal = this.compare;
        this.compare = function (a, b) { return compareOriginal(b, a); };
    };
    return Comparator;
}());
exports.default = Comparator;
