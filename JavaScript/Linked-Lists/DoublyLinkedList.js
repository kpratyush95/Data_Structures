"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DoubleListNode_1 = require("../../TypeScript/Linked-Lists/DoubleListNode");
var DoublyLinkedList = /** @class */ (function () {
    function DoublyLinkedList() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }
    /**
    * Checks if the list is empty
    *
    * @returns boolean, Whether the list is empty or not.
    */
    DoublyLinkedList.prototype.isEmpty = function () {
        return !this.head;
    };
    /**
     * Gets the data of the node at the give index.
     * Time Complexity: Linear O(n)
     *
     * @param index
     * @returns The data of the node at the given index or
     */
    DoublyLinkedList.prototype.getIndex = function (index) {
        var _a, _b;
        if (this.isEmpty()) {
            throw new Error("Cannot retrieve from an empty list");
        }
        if (index < 0 || index > length) {
            throw new Error("Index out of Bounds");
        }
        if (index === 0) {
            return (_a = this.head) === null || _a === void 0 ? void 0 : _a.data;
        }
        else if (index === this.length) {
            return (_b = this.tail) === null || _b === void 0 ? void 0 : _b.data;
        }
        var walker = this.head;
        for (var i = 0; i < index; i++) {
            if (!walker.next) {
                return null;
            }
            walker = walker.next;
        }
        return walker.data;
    };
    /**
    * Adds a given data to the first node of the list
    * O(1) Operation
    * @param data to be inserted
    *
    * @return void
    */
    DoublyLinkedList.prototype.push = function (data) {
        if (this.isEmpty()) {
            this.head = new DoubleListNode_1.DoubleListNode(data);
            this.length++;
            return;
        }
        var newNode = new DoubleListNode_1.DoubleListNode(data);
        this.head.previous = newNode;
        newNode.next = this.head;
        this.head = newNode;
        this.length++;
    };
    /**
     * Removes the 1st element from the list
     * O(1) operation
     *
     * @returns listNode data which has been removed or
     * throws an error if the list is empty.
     */
    DoublyLinkedList.prototype.pop = function () {
        if (this.isEmpty()) {
            throw new Error("Cannot pop from an empty list.");
        }
        var walker = this.head;
        this.head = this.head.next;
        this.head.next.previous = undefined;
        this.length--;
        return walker === null || walker === void 0 ? void 0 : walker.data;
    };
    /**
     * Inserts the given data as a new node after the
     * current tail. It is a O(1) operation
     *
     * @param data
     */
    DoublyLinkedList.prototype.append = function (data) {
        if (this.isEmpty()) {
            this.tail = this.head = new DoubleListNode_1.DoubleListNode(data);
        }
        else {
            var node = new DoubleListNode_1.DoubleListNode(data);
            node.previous = this.tail;
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return;
    };
    /**
 * Removes an element from the tail
 * This is a O(1) operation in Doubly Linked List.
 *
 * @returns the data of the element that has been
 * removed from the tail, or throws an error if the
 * list is empty.
 */
    DoublyLinkedList.prototype.removeTail = function () {
        if (this.isEmpty()) {
            throw new Error("Can't remove from an empty list");
        }
        var currentTail = this.tail;
        if (this.head === this.tail) {
            this.length--;
            this.head = this.tail = undefined;
            return currentTail.data;
        }
        this.length--;
        this.tail.previous.next = undefined;
        this.tail = this.tail.previous;
        return currentTail.data;
    };
    /**
    * Inserts a node with the given data, at a given index.
    *
    * Time Complexity O(n)
    *
    * @param index
    * @param data
    */
    DoublyLinkedList.prototype.insertAt = function (index, data) {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of Bounds.");
        }
        if (this.isEmpty()) {
            this.head = this.tail = new DoubleListNode_1.DoubleListNode(data);
        }
        else if (index === 0) {
            this.push(data);
        }
        else if (this.length === index) {
            this.append(data);
        }
        else {
            var walker = this.head;
            for (var i = 0; i < index - 1; i++) {
                walker = walker.next;
            }
            var newNode = new DoubleListNode_1.DoubleListNode(data);
            var nextNode = walker.next;
            newNode.next = nextNode;
            newNode.previous = walker;
            walker.next = newNode;
            nextNode.previous = newNode;
        }
        this.length++;
    };
    /**
    * Removes an element from the list at a given index.
    *
    * Time Complexity O(n)
    * @param index
    * @returns data of the node that has been removed
    */
    DoublyLinkedList.prototype.removeAt = function (index) {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of Bounds.");
        }
        if (this.isEmpty()) {
            throw new Error("Can't remove from an empty list");
        }
        if (index === 0) {
            return this.pop();
        }
        else if (index === this.length) {
            return this.removeTail();
        }
        else {
            var walker = this.head;
            for (var i = 0; i < index - 1; i++) {
                walker = walker === null || walker === void 0 ? void 0 : walker.next;
            }
            walker.previous.next = walker.next;
            walker.next.previous = walker.previous;
            this.length--;
            return walker === null || walker === void 0 ? void 0 : walker.data;
        }
    };
    /**
     * Clears the list
     */
    DoublyLinkedList.prototype.clear = function () {
        this.head = undefined;
        this.length = 0;
        this.tail = undefined;
    };
    /**
    *  Returns the length of the list
    *
    * Time Complexity O(1)
    *
    * @returns number
    */
    DoublyLinkedList.prototype.getLength = function () {
        return this.length;
    };
    /**
    * Traverses through the linked list and generates an array of the data
    *
    * O(n)
    *
    * @returns an array conating the data of the linked list
    */
    DoublyLinkedList.prototype.toArray = function () {
        var arr = [];
        var walker = this.head;
        while (walker) {
            arr.push(walker.data);
            walker = walker.next;
        }
        return arr;
    };
    /**
     * Reverses the list and then returns the new head of the list
     *
     * Time Complexity O(N)
     *
     * @returns the new head of the list
     */
    DoublyLinkedList.prototype.reverse = function () {
        if (this.isEmpty()) {
            throw new Error("Cannot reverse an empty list");
        }
        if (this.head == this.tail) {
            return this.head;
        }
        var walker = this.head;
        var previousNode = undefined;
        var nextNode = undefined;
        while (walker != null) {
            previousNode = walker.previous;
            nextNode = walker.next;
            walker.previous = nextNode;
            walker.next = previousNode;
            previousNode = walker;
            walker = nextNode;
        }
        this.tail = this.head;
        this.head = previousNode;
        return this.head;
    };
    return DoublyLinkedList;
}());
