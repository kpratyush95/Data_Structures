package LinkedLists;

public  class SingleListNode<T> implements IListNode<T> {
    public T data;
    public SingleListNode<T> next;

    public SingleListNode(T data) {
        this.data = data;
    }
    public SingleListNode(T data, SingleListNode<T> next) {
        this.data = data;
        this.next = next;
    }
}
