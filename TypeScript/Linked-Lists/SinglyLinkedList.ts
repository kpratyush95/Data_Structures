import {ILinkedList} from './IlinkedList';
import {ListNode} from './SingleListNode';

/**
 * This is an implementation of Singly Linked List, 
 * Singly Linked List is a linear data structure has 
 * 2 elements data is of type T and a reference to the 
 * next list node.
 */
export class SinglyLinkedList<T> implements ILinkedList<T> {
    private head?: ListNode<T>
    private tail?: ListNode<T>
    private length: number

    constructor() {
        this.head = undefined;
        this.tail = undefined;
        this.length = 0;
    }

    /**
     * Checks if the list is empty
     * 
     * @returns boolean, Whether the list is empty or not.
     */
    isEmpty(): boolean {
        return !this.head;
    }

    /**
     * Gets the data of the node at the give index.
     * Time Complexity: Linear O(n)
     * 
     * @param index
     * @returns The data of the node at the given index or
     */
    getIndex(index: number): T|null {
        if(index < 0 || index >= this.length){
            throw new Error("Index out of Bounds");
        }

        if(this.isEmpty()){
            return null;
        }

        let currentNode: ListNode<T> = this.head!;
        for(let i: number =0; i<index; i++){
            if(!currentNode.next){
                return null;
            }
            currentNode = currentNode.next;
        }
        return currentNode.data;
    }

    /**
     * Adds a given data to the first node of the list
     * O(1) Operation
     * @param data to be inserted
     * 
     * @return void
     */
    push(data: T): void {
        const node: ListNode<T> = new ListNode<T>(data);
        if(this.isEmpty()){
            this.head = node;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
    }

    /**
     * Removes the 1st element from the list
     * O(1) operation
     * 
     * @returns listNode data which has been removed or
     * throws an error if the list is empty.
     */
    pop(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Index out of Bounds");
        }

        const node: ListNode<T> = this.head!;
        this.head = this.head?.next;
        this.length--;

        return node.data;
    }

    /**
     * Inserts the given data as a new node after the 
     * current tail. It is a O(1) operation
     * 
     * @param data 
     */
    append(data: T): void {
       if(this.isEmpty()) {
        this.head = new ListNode<T>(data);
       }
       this.tail!.next = new ListNode<T>(data);
       this.tail = this.tail?.next;
       this.length++;
    }

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
    removeTail(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Index out of Bounds");
        }
        const currentTail: ListNode<T> = this.tail!;
        if(this.head === this.tail) {
            
            this.head = undefined;
            this.tail == undefined;
            this.length--;
            return currentTail.data;

        }

        let walker: ListNode<T>  = this.head!;
        while(walker!== currentTail) {
            walker = walker.next!;
        }

        this.tail = walker;
        this.length--;
        return currentTail.data;
    }

    /**
     * Inserts a node with the given data, at a given index.
     *
     * Time Complexity O(n)
     * 
     * @param index 
     * @param data 
     */
    insertAt(index: number, data: T): void {
        const node = new ListNode<T>(data);
        if(index < 0 || index> this.length){
            throw new Error("Index out of Bounds");
        }

        if(index === 0) { 
            node.next = this.head;
            this.head = node;
            this.length++;
            return; 
        }

        if(index === this.length){
            return this.append(data);
        }
        let walker:ListNode<T> = this.head!.next!;
        for(let i:number = 0; i< index-1; i++) {
            walker = walker.next!;
        }
        const nextNode = walker.next!;
        walker.next = node;
        node.next = nextNode;
        this.length++;
        return;
    }

    /**
     * Removes an element from the list at a given index.
     * 
     * Time Complexity O(n)
     * @param index 
     * @returns data of the node that has been removed
     */
    removeAt(index: number): T | undefined {
        if(index < 0 || index > this.length || this.isEmpty()) {
            throw new Error('Index out of bounds.');
        }
        let node: ListNode<T>; 
        if(index === 0) {
            node = this.head!;
            this.head = this.head?.next;
            this.length--;
            return;
        }
        if(index === this.length) {
            return this.removeTail();
        }
        let walker = this.head;
        for(let i =0; i< index-1; i++) {
            walker = walker?.next;
        }
        const removalNode = walker?.next;
        walker!.next = removalNode?.next;
        this.length--;
        return;
    }

    /**
     * Clears the list
     */
    clear(): void {
        this.head = undefined;
        this.length = 0;
        this.tail = undefined;
    }

    /**
     *  Returns the length of the list
     * 
     * Time Complexity O(1)
     * 
     * @returns number
     */
    getLength(): number {
        if(this.isEmpty()) {
            return 0;
        }
        return this.length;
    }
    
    /**
     * Reverses the list and then returns the new head of the list
     * 
     * Time Complexity O(N)
     * @returns the new head of the list
     */
    reverse(): ListNode<T> | undefined {
        if(this.isEmpty()) {
            throw new Error("Cannot reverse an empty list");
        }
        if(this.length === 1) {
            return this.head;
        }
        let walker = this.head;
        let previous;
        let nextNode;
        while(walker!=null) {
            nextNode = walker?.next;
            walker!.next = previous;
            previous = walker;
            walker = nextNode;            
        }
        this.head = previous;
        return this.head;
    }


    /**
     * Traverses through the linked list and generates an array of the data
     * 
     * O(n)
     * 
     * @returns an array conating the data of the linked list
     */
    toArray(): (T | undefined)[] {
        const arr: T[] = [];
        let walker = this.head;
        while(walker) {
            arr.push(walker.data);
            walker = walker.next;
        }
        return arr;
    }

}