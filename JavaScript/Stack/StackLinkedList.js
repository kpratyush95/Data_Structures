"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackLinkedList = void 0;
var StackNode_1 = require("./StackNode");
var StackLinkedList = /** @class */ (function () {
    function StackLinkedList() {
        this.head = null;
        this.top = null;
        this.size = 0;
    }
    /**
     * Checks if the stack is empty.
     *
     * @returns {boolean} - True if the stack is empty, otherwise false.
     *
     * Time complexity: O(1)
     */
    StackLinkedList.prototype.isEmpty = function () {
        return this.head === null;
    };
    /**
     * Pushes an item onto the top of the stack.
     *
     * @param {T} item - The item to push onto the stack.
     *
     * Time complexity: O(1)
     */
    StackLinkedList.prototype.push = function (item) {
        var newTop = new StackNode_1.StackNode(item);
        if (this.isEmpty()) {
            this.head = this.top = newTop;
        }
        else {
            this.top.next = newTop;
            this.top = newTop;
        }
        this.size++;
    };
    /**
     * Removes and returns the item at the top of the stack.
     *
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(n) in the worst case to find the previous node, O(1) amortized
     */
    StackLinkedList.prototype.pop = function () {
        var _a;
        if (this.isEmpty()) {
            throw new Error("Can't pop from an empty Stack");
        }
        var topData = (_a = this.top) === null || _a === void 0 ? void 0 : _a.data;
        if (this.head === this.top) {
            this.head = this.top = null;
        }
        else {
            var walker = this.head;
            while (walker !== null && walker.next !== this.top) {
                walker = walker.next;
            }
            this.top = walker;
            this.top.next = null;
        }
        this.size--;
        return topData;
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
    StackLinkedList.prototype.peek = function () {
        if (this.isEmpty()) {
            throw new Error("Can't peek from an empty Stack");
        }
        return this.top.data;
    };
    /**
    * Returns the number of items in the stack.
    *
    * @returns {number} - The number of items in the stack.
    *
    * Time complexity: O(1)
    */
    StackLinkedList.prototype.getSize = function () {
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
    StackLinkedList.prototype.search = function (item) {
        if (this.isEmpty()) {
            return -1;
        }
        var walker = this.head;
        for (var i = 0; walker != null; i++, walker = walker.next) {
            if (walker.data === item) {
                return this.size - i;
            }
        }
        return -1;
    };
    /**
     * Reverses the stack.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(n)
     */
    StackLinkedList.prototype.reverseStack = function () {
        if (this.isEmpty()) {
            throw new Error("can't reverse an empty stack");
            return;
        }
        var prevNode = null;
        var walker = this.head;
        var nextNode = null;
        this.top = this.head;
        while (walker !== null) {
            nextNode = walker.next;
            walker.next = prevNode;
            prevNode = walker;
            walker = nextNode;
        }
        this.head = prevNode;
    };
    return StackLinkedList;
}());
exports.StackLinkedList = StackLinkedList;
