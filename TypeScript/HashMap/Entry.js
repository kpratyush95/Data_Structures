"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entry = void 0;
/**
 * Represents a key-value pair.
 *
 * @template K The type of the key.
 * @template V The type of the value.
 * @param key The key.
 * @param value The value.
 */
var Entry = /** @class */ (function () {
    function Entry(key, value) {
        this.key = key;
        this.value = value;
        this.isDeleted = false;
    }
    return Entry;
}());
exports.Entry = Entry;
