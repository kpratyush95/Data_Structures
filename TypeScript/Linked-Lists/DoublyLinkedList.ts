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


    getIndex(index: number): T | null | undefined {
        throw new Error("Method not implemented.");
    }
    push(data: T): void {
        throw new Error("Method not implemented.");
    }
    pop(): T | undefined {
        throw new Error("Method not implemented.");
    }
    append(data: T): void {
        throw new Error("Method not implemented.");
    }
    removeTail(): T | undefined {
        throw new Error("Method not implemented.");
    }
    insertAt(index: number, data: T): void {
        throw new Error("Method not implemented.");
    }
    removeAt(index: number): T | undefined {
        throw new Error("Method not implemented.");
    }
    clear(): void {
        throw new Error("Method not implemented.");
    }
    getLength(): number {
        throw new Error("Method not implemented.");
    }
    toArray(): (T | undefined)[] {
        throw new Error("Method not implemented.");
    }

}