"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLinearProbingHashMap = void 0;
var Entry_1 = require("./Entry");
var CustomLinearProbingHashMap = /** @class */ (function () {
    function CustomLinearProbingHashMap(loafFactor, capacity) {
        if (loafFactor === void 0) { loafFactor = 0.75; }
        if (capacity === void 0) { capacity = 8; }
        this.size = 0;
        this.capacity = capacity;
        this.loadFactor = loafFactor;
        this.buckets = new Array(this.capacity);
        this.keys = {};
    }
    /**
     * Checks if the Hash Table is Empty
     * O(1) operation
     * @returns boolean
     */
    CustomLinearProbingHashMap.prototype.isEmpty = function () {
        return this.size === 0;
    };
    /**
     * Gets the next Available index as per Linear Probing
     * O(1) operation
     * @param index
     * @param key
     * @param step
     * @returns number
     */
    CustomLinearProbingHashMap.prototype.getNextIndex = function (index, key, step) {
        return (index + step) % this.capacity;
    };
    /**
    * Loops through the Hash Table and checks if the
    * key is present returns the index returns -1
    * if no key is present.
    * Average case O(1), Worst case O(n)
    * In the average case, it is O(1) due to the uniform distribution of keys.
    * In the worst case, if many collisions occur, it can degrade to O(n).
    * @param key
    * @returns number
    */
    CustomLinearProbingHashMap.prototype.findKey = function (key, callback) {
        var index = this.hashFunction(key);
        if (this.buckets[index] !== undefined
            && this.buckets[index].isDeleted === false
            && this.buckets[index].key === key) {
            return index;
        }
        var step = 1;
        var currentIndex = this.getNextIndex(index, key, step++);
        while (currentIndex != index) {
            if (callback(currentIndex, key, step)) {
                return currentIndex;
            }
            currentIndex = this.getNextIndex(index, key, step++);
        }
        /**
         * It means that the key is not in the hashtable
         * and we return -1
         */
        return -1;
    };
    /**
     * Get the Value for the given Key
     * Average case O(1), Worst case O(n)
     * In the average case, the time complexity is O(1) due to the uniform distribution of keys.
     * In the worst case, if there are many collisions, it can degrade to O(n).
     * @param key
     * @returns V | undefined
     */
    CustomLinearProbingHashMap.prototype.get = function (key) {
        var _this = this;
        var index = this.findKey(key, function (currentIndex, currentKey) {
            return _this.buckets[currentIndex] !== null
                && !_this.buckets[currentIndex].isDeleted
                && _this.buckets[currentIndex].key === currentKey;
        });
        if (index !== -1
            && this.buckets[index] !== null
            && !this.buckets[index].isDeleted) {
            return this.buckets[index].value;
        }
        return undefined;
    };
    /**
     * Adds a new Key Value pair in the Hash Table
     * If the table is nearly full, we resize the HashTable
     * If there is an existing key in the hashtable we update the value
     * Average case O(1), Worst case O(n)
     * In the average case, inserting an element is O(1).
     * In the worst case, if the table is nearly full and many collisions occur, it can degrade to O(n).
     *
     * @param key
     * @param value
     * @returns none
     */
    CustomLinearProbingHashMap.prototype.put = function (key, value) {
        var _this = this;
        var bucketIndex = this.findKey(key, function (currentIndex, currentKey) {
            var _a, _b;
            return (_this.buckets[currentIndex] !== null
                && ((_a = _this.buckets[currentIndex]) === null || _a === void 0 ? void 0 : _a.key) === currentKey
                && !((_b = _this.buckets[currentIndex]) === null || _b === void 0 ? void 0 : _b.isDeleted));
        });
        /**
         *  Don't need to check the buckets[bucketIndex].key === key
         *  as the findKey is basically doing the same
        */
        if (bucketIndex !== -1
            && !this.buckets[bucketIndex].isDeleted) {
            this.buckets[bucketIndex].value = value;
            return;
        }
        var load = (this.size + 1) / this.capacity;
        if (load > this.loadFactor) {
            this.resizeHashTable();
        }
        var newIndex = this.findEmptyIndex(key);
        this.buckets[newIndex] = new Entry_1.Entry(key, value);
        this.keys[key] = newIndex;
        this.size++;
    };
    /**
     *
     * @returns the Set of Keys in the Hash Table
     * O(n)
     */
    CustomLinearProbingHashMap.prototype.keySet = function () {
        return new Set(Object.keys(this.keys));
    };
    /**
     *
     * @returns The Array of Values in the HashTable
     * O(n)
     */
    CustomLinearProbingHashMap.prototype.values = function () {
        return this.buckets.filter(function (entry) { return entry !== null && !entry.isDeleted; }).map(function (entry) { return entry.value; });
    };
    /**
     * Returns the Array of Entries in the HashTable
     * O(n)
     */
    CustomLinearProbingHashMap.prototype.entries = function () {
        return this.buckets.filter(function (entry) { return entry !== null && !entry.isDeleted; });
    };
    /**
     * Removes the Given Key from the Hash Table
     * Average case O(1), Worst case O(n)
     * In the average case, finding and marking an entry as deleted is O(1).
     * In the worst case, if many collisions occur, it can degrade to O(n).
     *
     * @param key
     * @returns Value if thre exists a key or undefined
     */
    CustomLinearProbingHashMap.prototype.remove = function (key) {
        var _this = this;
        var bucketIndex = this.findKey(key, function (currentIndex, currentKey) {
            return (_this.buckets[currentIndex] !== null
                && !_this.buckets[currentIndex].isDeleted
                && _this.buckets[currentIndex].key === currentKey);
        });
        if (bucketIndex !== -1
            && this.buckets[bucketIndex] !== null) {
            this.buckets[bucketIndex].isDeleted = true;
            delete this.keys[key];
            this.size--;
            return this.buckets[bucketIndex].value;
        }
        return undefined;
    };
    /**
     * Checking the presence of a key in the keys object is a constant-time operation.
     * @param key
     * @returns boolean
     */
    CustomLinearProbingHashMap.prototype.constainsKey = function (key) {
        return this.keys.hasOwnProperty(key);
    };
    /**
     * Initializes the buckets array and the keys object.
     * O(n)
     */
    CustomLinearProbingHashMap.prototype.clear = function () {
        this.buckets.fill(new Entry_1.Entry(undefined, undefined));
        this.size = 0;
        this.keys = {};
    };
    /**
     * Rehashes all entries in the hash table.
     * O(n)
     */
    CustomLinearProbingHashMap.prototype.resizeHashTable = function () {
        var _this = this;
        var oldBuckets = this.buckets;
        this.capacity *= 2;
        this.buckets = Array.from({ length: this.capacity }, function () { return new Entry_1.Entry(null, null); });
        this.size = 0;
        this.keys = {};
        oldBuckets.forEach(function (bucketEntry) {
            if (!bucketEntry.isDeleted) {
                _this.put(bucketEntry.key, bucketEntry.value);
            }
        });
    };
    /**
     * Computes the Hash of the key
     * O(|key|) The time complexity depends on the length of the key.
     * @param key
     * @returns
     */
    CustomLinearProbingHashMap.prototype.hashFunction = function (key) {
        // return Number(key) % this.capacity;
        var hash = 0;
        var strKey = String(key);
        for (var i = 0; i < strKey.length; i++) {
            var char = strKey.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash % this.capacity;
    };
    /**
     * Finds the next Empty index in the Hash Table
     * Average case O(1), Worst case O(n)
     * In the average case, it is O(1) due to the uniform distribution of keys.
     * In the worst case, if many collisions occur, it can degrade to O(n).
     * @param key
     * @returns
     */
    CustomLinearProbingHashMap.prototype.findEmptyIndex = function (key) {
        var _a;
        var index = this.hashFunction(key);
        var step = 1;
        while (this.buckets[index] !== null && !((_a = this.buckets[index]) === null || _a === void 0 ? void 0 : _a.isDeleted)) {
            index = this.getNextIndex(index, key, step++);
        }
        return index;
    };
    return CustomLinearProbingHashMap;
}());
exports.CustomLinearProbingHashMap = CustomLinearProbingHashMap;
