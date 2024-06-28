package Stack;

public interface IStack<T> {
    public void push (T item);
    
    public T pop();

    public T peek();

    public boolean isEmpty();

    public int search(Object object);

    public int size();

    public void reverseStack();
}
