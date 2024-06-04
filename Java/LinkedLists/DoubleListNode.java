package LinkedLists;

public class DoubleListNode<T> implements IListNode<T>{

    T data;
    DoubleListNode<T> next;
    DoubleListNode<T> previous;

    public DoubleListNode(T data){
        this.data = data;
    }

    public DoubleListNode(T data, DoubleListNode<T> next) {
        this.data = data;
        this.next = next;
    }

    public DoubleListNode (T data, DoubleListNode<T> next, DoubleListNode<T> previous) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
