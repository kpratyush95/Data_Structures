import { DoubleListNode } from "./DoubleListNode";
import { ILinkedList } from "./IlinkedList"

class DoublyLinkedList<T> implements ILinkedList<T> {

    private head?: DoubleListNode<T>;
    private tail?: DoubleListNode<T>;
    private length: number;

    constructor() {
        this.head = undefined ;
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
    getIndex(index: number): T | null | undefined {
        if(this.isEmpty()) {
            throw new Error("Cannot retrieve from an empty list");
        } if(index < 0 || index > length) {
            throw new Error("Index out of Bounds");
        }
        if(index === 0) {
            return this.head?.data;
        } else if (index === this.length) {
            return this.tail?.data;
        }
        let walker: DoubleListNode<T> = this.head!;
        for(let i: number = 0; i < index; i++) {
            if(!walker.next) {
                return null;
            }
            walker = walker.next!;
        }
        return walker.data;
        
    }
   
     /**
     * Adds a given data to the first node of the list
     * O(1) Operation
     * @param data to be inserted
     * 
     * @return void
     */
    push(data: T): void {
        if(this.isEmpty()) {
            this.head = new DoubleListNode(data);
            this.length++;
            return;
        }
        const newNode = new DoubleListNode(data);
        this.head!.previous = newNode;
        newNode.next = this.head;
        this.head = newNode;
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
            throw new Error("Cannot pop from an empty list.");
        }
        const walker = this.head;
         this.head = this.head!.next;
         this.head!.previous = undefined;
        this.length--;
        return walker?.data;
    }

    /**
     * Inserts the given data as a new node after the 
     * current tail. It is a O(1) operation
     * 
     * @param data 
     */
    append(data: T): void {
        if(this.isEmpty()) {
            this.tail = this.head = new DoubleListNode(data);
        } else {
            const node:DoubleListNode<T> = new DoubleListNode(data);
            node.previous = this.tail;
            this.tail!.next = node;
            this.tail = node;
        }
        this.length++;
        return;
    }

        /**
     * Removes an element from the tail
     * This is a O(1) operation in Doubly Linked List.
     * 
     * @returns the data of the element that has been
     * removed from the tail, or throws an error if the 
     * list is empty.
     */
    removeTail(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Can't remove from an empty list");
        }
        const currentTail: DoubleListNode<T> = this.tail!;
        if(this.head === this.tail) {
            this.length--;
            this.head = this.tail = undefined;
            return currentTail.data;
        }
        this.length--;
        this.tail!.previous!.next = undefined;
        this.tail = this.tail!.previous;
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
        if(index < 0 || index > this.length) {
            throw new Error("Index out of Bounds.");
        }
        if(this.isEmpty()) {
            this.head = this.tail = new DoubleListNode<T>(data);
        } else if(index === 0) {
            this.push(data);
        } else if(this.length === index) {
            this.append(data);
        } else {
            let walker: DoubleListNode<T> = this.head!;
            for(let i=0; i<index-1; i++){
                walker = walker.next!;
            }
           
            const newNode = new DoubleListNode<T>(data);
            const nextNode = walker.next;
            
            newNode.next = nextNode;
            newNode.previous = walker;
            walker.next = newNode
            nextNode!.previous = newNode
        }
        this.length++;
    }

     /**
     * Removes an element from the list at a given index.
     * 
     * Time Complexity O(n)
     * @param index 
     * @returns data of the node that has been removed
     */
    removeAt(index: number): T | undefined {
        if(index < 0 || index > this.length) {
            throw new Error("Index out of Bounds.");
        } 
        if(this.isEmpty()) {
            throw new Error("Can't remove from an empty list");
        } if(index === 0) {
            return this.pop();
        } else if(index === this.length) {
            return this.removeTail();
        } else {
            let walker = this.head;
            for(let i = 0; i < index-1; i++) {
                walker = walker?.next;
            }
            walker!.previous!.next = walker!.next;
            walker!.next!.previous = walker!.previous;
            this.length--;
            return walker?.data;
        }
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
        return this.length;
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

    /**
     * Reverses the list and then returns the new head of the list
     * 
     * Time Complexity O(N)
     * 
     * @returns the new head of the list
     */
    reverse(): DoubleListNode<T> | undefined {
        if(this.isEmpty()) {
            throw new Error("Cannot reverse an empty list");
        }
        if(this.head == this.tail) {
            return this.head;
        }
        let walker: DoubleListNode<T> = this.head!;
        let previousNode: DoubleListNode<T> = undefined;
        let nextNode: DoubleListNode<T> = undefined;
        
        while(walker!=null) {
            previousNode = walker.previous!;
            nextNode = walker.next!;

            walker.previous = nextNode;
            walker.next = previousNode;
            
            previousNode = walker;
            walker = nextNode;
        }

        this.tail = this.head;
        this.head = previousNode;
        return this.head;

    }
}