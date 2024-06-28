export interface IStack<T> {

    isEmpty() : boolean;

    push(item : T) : void;

    pop() : T | undefined;

    peek() : T | undefined;

    getSize() : number;

    search(item : T) : number;

    reverseStack() : void;
}