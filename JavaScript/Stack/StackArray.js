"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StackArray = /** @class */ (function () {
    /**
     * Constructs a stack with a specified capacity or the default capacity.
     *
     * @param {number} [capacity = 10] - The initial capacity of the stack.
     */
    function StackArray(capacity) {
        if (capacity === void 0) { capacity = 10; }
        this.DEFAULT_CAPACITY = 10;
        this.capacity = capacity || this.DEFAULT_CAPACITY;
        this.stackArray = new Array(this.capacity);
        this.size = 0;
        this.top = -1;
    }
    /**
     * Checks if the stack is empty.
     *
     * @returns {boolean} - True if the stack is empty, otherwise false.
     *
     * Time complexity: O(1)
     */
    StackArray.prototype.isEmpty = function () {
        return this.top === -1;
    };
    /**
     * Pushes an item onto the top of the stack.
     *
     * @param {T} item - The item to push onto the stack.
     *
     * Time complexity: O(1) amortized, O(n) when resizing
     */
    StackArray.prototype.push = function (item) {
        if ((this.top + 1) >= this.capacity) {
            this.resizeStack(this.capacity * 2);
        }
        this.stackArray[++this.top] = item;
        this.size++;
    };
    /**
     * Removes and returns the item at the top of the stack.
     *
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(1)
     */
    StackArray.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new Error("Can't pop from an empty Stack");
        }
        return this.stackArray[this.top--];
    };
    /**
     * Returns the item at the top of the stack without removing it.
     *
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(1)
     */
    StackArray.prototype.peek = function () {
        if (this.isEmpty()) {
            throw new Error("Can't peek from an empty Stack");
        }
        return this.stackArray[this.top];
    };
    /**
     * Returns the number of items in the stack.
     *
     * @returns {number} - The number of items in the stack.
     *
     * Time complexity: O(1)
     */
    StackArray.prototype.getSize = function () {
        return this.size;
    };
    /**
     * Searches for an item in the stack and returns its 1-based position from the top.
     *
     * @param {T} item - The item to search for.
     * @returns {number} - The 1-based position from the top of the stack if found, otherwise -1.
     *
     * Time complexity: O(n)
     */
    StackArray.prototype.search = function (item) {
        if (this.isEmpty()) {
            return -1;
        }
        for (var i = 0; i <= this.top; i++) {
            if (this.stackArray[i] === item) {
                return this.top - i + 1;
            }
        }
        return -1;
    };
    /**
     * Resizes the stack to a new capacity.
     *
     * @param {number} newCapacity - The new capacity of the stack.
     *
     * Time complexity: O(n)
     */
    StackArray.prototype.resizeStack = function (newCapacity) {
        var resizedStack = new Array(newCapacity);
        var i = 0;
        this.stackArray.forEach(function (element) {
            resizedStack[i++] = element;
        });
        this.stackArray = resizedStack;
        this.capacity = newCapacity;
    };
    /**
    * Reverses the stack.
    *
    * @throws {Error} - If the stack is empty.
    *
    * Time complexity: O(n)
    */
    StackArray.prototype.reverseStack = function () {
        if (this.isEmpty()) {
            throw new Error("Can't reverse an empty Stack");
        }
        var reversedStackArray = new Array(this.capacity);
        var currentIndex = 0;
        while (!this.isEmpty()) {
            reversedStackArray[currentIndex++] = this.pop();
        }
        this.stackArray = reversedStackArray;
        this.top = currentIndex - 1;
        this.size = currentIndex;
    };
    return StackArray;
}());
