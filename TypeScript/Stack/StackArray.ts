import { IStack } from "./IStack";

class StackArray<T> implements IStack<T> {

    readonly DEFAULT_CAPACITY: number = 10;
    private capacity : number;
    private stackArray: T[];
    private top : number;
    private size: number;

    /**
     * Constructs a stack with a specified capacity or the default capacity.
     * 
     * @param {number} [capacity = 10] - The initial capacity of the stack.
     */
    constructor(capacity : number = 10) {
        this.capacity = capacity || this.DEFAULT_CAPACITY;
        this.stackArray = new Array<T>(this.capacity);
        this.size = 0;
        this.top = -1;
    }

    /**
     * Checks if the stack is empty.
     * 
     * @returns {boolean} - True if the stack is empty, otherwise false.
     * 
     * Time complexity: O(1)
     */
    isEmpty(): boolean {
        return this.top === -1;
    }

    /**
     * Pushes an item onto the top of the stack.
     * 
     * @param {T} item - The item to push onto the stack.
     * 
     * Time complexity: O(1) amortized, O(n) when resizing
     */
    push(item: T): void {
        if((this.top+1)>= this.capacity) {
            this.resizeStack(this.capacity*2);
        }
        this.stackArray[++this.top] = item;
        this.size++;
    }

    /**
     * Removes and returns the item at the top of the stack.
     * 
     * @returns {T | undefined} - The item at the top of the stack, or undefined if the stack is empty.
     * 
     * @throws {Error} - If the stack is empty.
     * 
     * Time complexity: O(1)
     */
    pop(): T | undefined {
        if(this.isEmpty()) {
            throw new Error("Can't pop from an empty Stack");
        }
        return this.stackArray[this.top--];
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
    peek(): T | undefined{
        if(this.isEmpty()) {
            throw new Error("Can't peek from an empty Stack");
        }
        return this.stackArray[this.top];
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
        for(let i = 0; i <= this.top; i++) {
            if(this.stackArray[i] === item) {
                return this.top -i + 1;
            }
        }
        return -1;
    }

    /**
     * Resizes the stack to a new capacity.
     * 
     * @param {number} newCapacity - The new capacity of the stack.
     * 
     * Time complexity: O(n)
     */
    resizeStack(newCapacity: number) : void {
        let resizedStack:T[] = new Array<T>(newCapacity);
        let i=0;
        this.stackArray.forEach(element => {
            resizedStack[i++] = element;
        });
        this.stackArray = resizedStack;
        this.capacity = newCapacity;
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
            throw new Error("Can't reverse an empty Stack");
       }
      let reversedStackArray:T[] = new Array<T>(this.capacity);
      let currentIndex = 0;
       while(!this.isEmpty()) {
        reversedStackArray[currentIndex++] = this.pop()!;
       }
       this.stackArray = reversedStackArray;
       this.top = currentIndex -1;
       this.size = currentIndex;
    }
    
}