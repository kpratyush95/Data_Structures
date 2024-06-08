"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entry_1 = require("../../TypeScript/HashMap/Entry");
var SinglyLinkedList_1 = require("../../TypeScript/Linked-Lists/SinglyLinkedList");
var CustomHashMap = /** @class */ (function () {
    function CustomHashMap(length) {
        if (length === void 0) { length = 5; }
        this.buckets = Array(length).fill(undefined).map(function () { return new SinglyLinkedList_1.SinglyLinkedList(); });
        this.keys = {};
    }
    CustomHashMap.prototype.isEmpty = function () {
        return this.size > 0;
    };
    CustomHashMap.prototype.get = function (key) {
        var bucketIndex = this.hashFunction(key);
        var entriesList = this.buckets[bucketIndex];
        var entry = entriesList.find({ callback: function (listNode) { return listNode.key === key; } });
        return entry ? entry.data.value : undefined;
    };
    CustomHashMap.prototype.put = function (key, value) {
        var bucketIndex = this.hashFunction(key);
        var entriesList = this.buckets[bucketIndex];
        var stringKey = String(key);
        this.keys[stringKey] = bucketIndex;
        var existingEntry = entriesList.find({ callback: function (listNode) { return listNode.key === key; } });
        if (existingEntry) {
            existingEntry.data.value = value;
        }
        else {
            this.size++;
            entriesList.append(new Entry_1.Entry(key, value));
        }
        if (this.size / this.buckets.length > this.loadFactor) {
            this.resizeHashTable();
        }
    };
    CustomHashMap.prototype.keySet = function () {
        var keySet = new Set();
        for (var _i = 0, _a = Object.keys(this.keySet); _i < _a.length; _i++) {
            var stringKey = _a[_i];
            keySet.add(stringKey);
        }
        return keySet;
    };
    CustomHashMap.prototype.values = function () {
        return this.buckets.reduce(function (values, bucket) {
            var bucketValues = bucket.toArray().map(function (entry) { return entry.data.value; });
            return values.concat(bucketValues);
        }, []);
    };
    CustomHashMap.prototype.entries = function () {
        return this.buckets.reduce(function (entries, bucket) {
            var bucketEntry = bucket.toArray.map(function (entry) { return ({
                key: entry.data.key,
                value: entry.data.value,
            }); });
            return entries.concat(bucketEntry);
        }, []);
    };
    CustomHashMap.prototype.remove = function (key) {
        var _a;
        var bucketIndex = this.hashFunction(key);
        delete this.keySet[String(key)];
        var entriesList = this.buckets[bucketIndex];
        var existingEntry = entriesList.find({ callback: function (listNode) { return listNode.key === key; } });
        if (existingEntry) {
            return (_a = entriesList.delete(existingEntry.data)) === null || _a === void 0 ? void 0 : _a.value;
        }
    };
    CustomHashMap.prototype.constainsKey = function (key) {
        var stringKey = String(key);
        return stringKey in this.keys;
    };
    CustomHashMap.prototype.clear = function () {
        this.buckets.forEach(function (bucket) {
            bucket.clear();
        });
        this.size = 0;
    };
    CustomHashMap.prototype.resizeHashTable = function () {
        var _this = this;
        var newCapacity = this.buckets.length * 2;
        var newBuckets = this.buckets.reduce(function (newBucketAccumulator, bucket) {
            bucket.toArray().forEach(function (entryNode) {
                var entry = entryNode.data;
                var newIndex = _this.hashFunction(entry.key);
                if (!newBucketAccumulator[newIndex]) {
                    newBucketAccumulator[newIndex] = (SinglyLinkedList_1.SinglyLinkedList);
                }
                newBucketAccumulator[newIndex].append(entry);
            });
            return newBucketAccumulator;
        }, Array.from({ length: newCapacity }));
        this.buckets = newBuckets;
    };
    CustomHashMap.prototype.hashFunction = function (key) {
        /**
        *    For simplicity reasons we will just use character codes sum of all characters of the key
        *   to calculate the hash.
        *    But you may also use more sophisticated approaches like polynomial string hash to reduce the
        *    number of collisions:
        *    hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
        *   where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
        *    PRIME is just any prime number like 31.
        */
        var hash = Array.from(String(key)).reduce(function (hashAccumulator, keySymbol) { return (hashAccumulator + keySymbol.charCodeAt(0)); }, 0);
        return hash % this.buckets.length;
    };
    return CustomHashMap;
}());
exports.default = CustomHashMap;
