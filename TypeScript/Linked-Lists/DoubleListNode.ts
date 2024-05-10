/**
 * Representing a Node class in a Doubly Linked List
 * @template T the type of data stored in the node.
 * 
 * @property data: the data stored in the node
 * @property previous : A reference(pointer) to the previous element
 * @property next: A reference(pointer) to the next element, by default it is null.
 */
export class DoubleListNode<T> {
    constructor(
        public data: T,
        public previous?: DoubleListNode<T>,
        public next?: DoubleListNode<T>
    ){};
}