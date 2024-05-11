package Java.LinkedLists;

import java.util.List;


public interface ILinkedList<T> {
    public boolean isEmpty();

    public int size();

    public T getIndex(int index);
    
    public void push(T data);

    public T pop();

    public void append(T data);

    public T removeTail();

    public void insertAt(int index, T data);

    public T removeAt(int index);

    public void clear();

    public List<T> toArray();

    public IListNode<T> reverse();
}
