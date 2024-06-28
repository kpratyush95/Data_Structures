export class StackNode<T> {
    data: T;
    next: StackNode<T> | null;
    constructor(data:T, next: StackNode<T>| null = null) {
        this.data = data;
        this.next = next;
    }
}