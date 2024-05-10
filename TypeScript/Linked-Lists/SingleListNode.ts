/**
 * Representing a Node class in a Singly Linked List
 * @template T the type of data stored in the node.
 * 
 * @property data: the data stored in the node
 * @property next: A reference(pointer) to the next element, by default it is null.
 */
export class ListNode<T> {

    constructor(
        public data: T,
        public next?: ListNode<T>
    ) {}
}