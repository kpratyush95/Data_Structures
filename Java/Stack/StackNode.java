package Stack;

public class StackNode<T> {
    private T stackData;
    private StackNode<T> next;

    public StackNode(T stackData) {
        this(stackData, null);
    }
    public StackNode(T stackData, StackNode<T> next) {
        this.stackData = stackData;
        this.next = next;
    }

    public T getStackData() {
        return this.stackData;
    }

    public void setStackData(T stackData) {
        this.stackData = stackData;
    }

    public StackNode<T> getNext() {
        return this.next;
    }

    public void setNext(StackNode<T> next) {
        this.next = next;
    }
}
