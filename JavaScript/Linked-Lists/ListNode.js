"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListNode = void 0;
/**
 * Representing a Node class in a Linked List
 * @template T the type of data stored in the node.
 *
 * @property data: the data stored in the node
 * @property next: A reference(pointer) to the next element, by default it is null.
 */
var ListNode = /** @class */ (function () {
    function ListNode(data, next) {
        this.data = data;
        this.next = next;
    }
    return ListNode;
}());
exports.ListNode = ListNode;
