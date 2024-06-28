import { IStack } from "./IStack";
import { StackNode } from "./StackNode";

export class StackLinkedList<T> implements IStack<T> {

    head: StackNode<T> | null;
    top : StackNode<T> | null;
    size: number;

    constructor() {
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
    isEmpty(): boolean {
        return this.head === null;
    }

    /**
     * Pushes an item onto the top of the stack.
     *
     * @param {T} item - The item to push onto the stack.
     *
     * Time complexity: O(1)
     */
    push(item: T): void {
        const newTop:StackNode<T> = new StackNode(item);
        if(this.isEmpty()) {
            this.head = this.top = newTop; 
        } else {
            this.top!.next = newTop;
            this.top = newTop;
        }
        this.size++;
    }


    /**
     * Removes and returns the item at the top of the stack.
     *
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(n) in the worst case to find the previous node, O(1) amortized
     */
    pop(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Can't pop from an empty Stack");
        }
        const topData:T = this.top?.data!;
        if(this.head === this.top) {
            this.head = this.top = null;
        } else {
            let walker: StackNode<T> | null = this.head;
            while(walker !== null && walker.next !== this.top) {
                walker = walker.next;
            }
            this.top = walker;
            this.top!.next = null;
        }
        this.size--;
        return topData;
    }

    /**
     * Returns the item at the top of the stack without removing it.
     *
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(1)
     */
    peek(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Can't peek from an empty Stack");
        }
        return this.top!.data;
    }
    
     /**
     * Returns the number of items in the stack.
     *
     * @returns {number} - The number of items in the stack.
     *
     * Time complexity: O(1)
     */
    getSize(): number {
        return this.size;
    }

     /**
     * Searches for an item in the stack and returns its 1-based position from the top.
     *
     * @param {T} item - The item to search for.
     * @returns {number} - The 1-based position from the top of the stack if found, otherwise -1.
     *
     * Time complexity: O(n)
     */
    search(item: T): number {
        if(this.isEmpty()) {
            return -1;
        }
        let walker: StackNode<T> = this.head!;
        for(let i =0; walker!= null; i++,  walker = walker.next!) {
            if(walker.data === item) {
                return this.size - i;
            }
        }
        return -1;
    }

    /**
     * Reverses the stack.
     *
     * @throws {Error} - If the stack is empty.
     *
     * Time complexity: O(n)
     */
    reverseStack(): void {
        if(this.isEmpty()) {
            throw new Error("can't reverse an empty stack");
            return;
        }
        let prevNode : StackNode<T>| null = null;
        let walker : StackNode<T>| null = this.head!;
        let nextNode : StackNode<T>| null = null;
        this.top = this.head;
        while(walker!== null) {
            nextNode = walker.next;
            walker.next = prevNode;
            prevNode = walker;
            walker = nextNode;
        }
        this.head = prevNode;
    }

}