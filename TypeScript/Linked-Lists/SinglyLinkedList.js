"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglyLinkedList = void 0;
var SingleListNode_1 = require("./SingleListNode");
var Comparator_1 = require("./../Utils/Comparator/Comparator");
/**
 * This is an implementation of Singly Linked List,
 * Singly Linked List is a linear data structure has
 * 2 elements data is of type T and a reference to the
 * next list node.
 */
var SinglyLinkedList = /** @class */ (function () {
    function SinglyLinkedList(comparatorFunction) {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
        this.compare = new Comparator_1.default(comparatorFunction);
    }
    /**
     * Checks if the list is empty
     *
     * @returns boolean, Whether the list is empty or not.
     */
    SinglyLinkedList.prototype.isEmpty = function () {
        return !this.head;
    };
    /**
     * Gets the data of the node at the give index.
     * Time Complexity: Linear O(n)
     *
     * @param index
     * @returns The data of the node at the given index or
     */
    SinglyLinkedList.prototype.getIndex = function (index) {
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of Bounds");
        }
        if (this.isEmpty()) {
            return null;
        }
        var currentNode = this.head;
        for (var i = 0; i < index; i++) {
            if (!currentNode.next) {
                return null;
            }
            currentNode = currentNode.next;
        }
        return currentNode.data;
    };
    /**
     * Adds a given data to the first node of the list
     * O(1) Operation
     * @param data to be inserted
     *
     * @return void
     */
    SinglyLinkedList.prototype.push = function (data) {
        var node = new SingleListNode_1.ListNode(data);
        if (this.isEmpty()) {
            this.head = node;
        }
        else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    };
    /**
     * Removes the 1st element from the list
     * O(1) operation
     *
     * @returns listNode data which has been removed or
     * throws an error if the list is empty.
     */
    SinglyLinkedList.prototype.pop = function () {
        var _a;
        if (this.isEmpty()) {
            throw new Error("Index out of Bounds");
        }
        var node = this.head;
        this.head = (_a = this.head) === null || _a === void 0 ? void 0 : _a.next;
        this.length--;
        return node.data;
    };
    /**
     * Inserts the given data as a new node after the
     * current tail. It is a O(1) operation
     *
     * @param data
     */
    SinglyLinkedList.prototype.append = function (data) {
        var _a;
        if (this.isEmpty()) {
            this.head = new SingleListNode_1.ListNode(data);
        }
        this.tail.next = new SingleListNode_1.ListNode(data);
        this.tail = (_a = this.tail) === null || _a === void 0 ? void 0 : _a.next;
        this.length++;
    };
    /**
     * Removes an element from the tail
     * This is a O(n) operation, as we need to
     * loop through all the elements to get the new
     * tail.
     *
     * @returns the data of the element that has been
     * removed from the tail, or throws an error if the
     * list is empty.
     */
    SinglyLinkedList.prototype.removeTail = function () {
        if (this.isEmpty()) {
            throw new Error("Index out of Bounds");
        }
        var currentTail = this.tail;
        if (this.head === this.tail) {
            this.head = undefined;
            this.tail == undefined;
            this.length--;
            return currentTail.data;
        }
        var walker = this.head;
        while (walker !== currentTail) {
            walker = walker.next;
        }
        this.tail = walker;
        this.length--;
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
    SinglyLinkedList.prototype.insertAt = function (index, data) {
        var node = new SingleListNode_1.ListNode(data);
        if (index < 0 || index > this.length) {
            throw new Error("Index out of Bounds");
        }
        if (index === 0) {
            node.next = this.head;
            this.head = node;
            this.length++;
            return;
        }
        if (index === this.length) {
            return this.append(data);
        }
        var walker = this.head.next;
        for (var i = 0; i < index - 1; i++) {
            walker = walker.next;
        }
        var nextNode = walker.next;
        walker.next = node;
        node.next = nextNode;
        this.length++;
        return;
    };
    /**
     * Removes an element from the list at a given index.
     *
     * Time Complexity O(n)
     * @param index
     * @returns data of the node that has been removed
     */
    SinglyLinkedList.prototype.removeAt = function (index) {
        var _a;
        if (index < 0 || index > this.length || this.isEmpty()) {
            throw new Error('Index out of bounds.');
        }
        var node;
        if (index === 0) {
            node = this.head;
            this.head = (_a = this.head) === null || _a === void 0 ? void 0 : _a.next;
            this.length--;
            return;
        }
        if (index === this.length) {
            return this.removeTail();
        }
        var walker = this.head;
        for (var i = 0; i < index - 1; i++) {
            walker = walker === null || walker === void 0 ? void 0 : walker.next;
        }
        var removalNode = walker === null || walker === void 0 ? void 0 : walker.next;
        walker.next = removalNode === null || removalNode === void 0 ? void 0 : removalNode.next;
        this.length--;
        return;
    };
    /**
     * Clears the list
     */
    SinglyLinkedList.prototype.clear = function () {
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
    SinglyLinkedList.prototype.getLength = function () {
        if (this.isEmpty()) {
            return 0;
        }
        return this.length;
    };
    /**
     * Reverses the list and then returns the new head of the list
     *
     * Time Complexity O(N)
     * @returns the new head of the list
     */
    SinglyLinkedList.prototype.reverse = function () {
        if (this.isEmpty()) {
            throw new Error("Cannot reverse an empty list");
        }
        if (this.length === 1) {
            return this.head;
        }
        var walker = this.head;
        var previous;
        var nextNode;
        while (walker != null) {
            nextNode = walker === null || walker === void 0 ? void 0 : walker.next;
            walker.next = previous;
            previous = walker;
            walker = nextNode;
        }
        this.head = previous;
        return this.head;
    };
    /**
     * Traverses through the linked list and generates an array of the data
     *
     * O(n)
     *
     * @returns an array conating the data of the linked list
     */
    SinglyLinkedList.prototype.toArray = function () {
        var arr = [];
        var walker = this.head;
        while (walker) {
            arr.push(walker.data);
            walker = walker.next;
        }
        return arr;
    };
    /**
        * @param {Object} findParams
        * @param {*} findParams.value
        * @param {function} [findParams.callback]
        * @return {LinkedListNode}
    */
    SinglyLinkedList.prototype.find = function (_a) {
        var _b = _a.value, value = _b === void 0 ? undefined : _b, _c = _a.callback, callback = _c === void 0 ? undefined : _c;
        if (this.isEmpty()) {
            throw new Error("Cannot compare from an empty list");
        }
        var currentNode = this.head;
        while (currentNode) {
            // If callback is specified then try to find node by callback.
            if (callback && callback(currentNode.data)) {
                return currentNode;
            }
            // If value is specified then try to compare by value..
            if (value !== undefined && this.compare.equal(currentNode.data, value)) {
                return currentNode;
            }
            currentNode = currentNode.next;
        }
        return undefined;
    };
    /**
     *
     */
    SinglyLinkedList.prototype.delete = function (data) {
        var _a, _b, _c, _d;
        if (this.isEmpty()) {
            throw new Error("Cannot delete from an empty list");
        }
        if (((_a = this.head) === null || _a === void 0 ? void 0 : _a.data) === data) {
            return this.pop();
        }
        else if (((_b = this.tail) === null || _b === void 0 ? void 0 : _b.data) === data) {
            return this.removeTail();
        }
        else {
            var walker = this.head;
            var deletedNode = void 0;
            while (walker) {
                if (walker.next && this.compare.compare((_c = walker.next) === null || _c === void 0 ? void 0 : _c.data, data) === 0) {
                    deletedNode = walker.next;
                    walker.next = (_d = walker.next) === null || _d === void 0 ? void 0 : _d.next;
                }
                else {
                    walker = walker.next;
                }
            }
            return deletedNode ? deletedNode.data : undefined;
        }
    };
    return SinglyLinkedList;
}());
exports.SinglyLinkedList = SinglyLinkedList;
