"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoubleListNode = void 0;
/**
 * Representing a Node class in a Doubly Linked List
 * @template T the type of data stored in the node.
 *
 * @property data: the data stored in the node
 * @property previous : A reference(pointer) to the previous element
 * @property next: A reference(pointer) to the next element, by default it is null.
 */
var DoubleListNode = /** @class */ (function () {
    function DoubleListNode(data, previous, next) {
        this.data = data;
        this.previous = previous;
        this.next = next;
    }
    ;
    return DoubleListNode;
}());
exports.DoubleListNode = DoubleListNode;
