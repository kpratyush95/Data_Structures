package Stack;

/**
 * A stack implementation using a linked list.
 *
 * @param <T> the type of elements in this stack
 */
public class StackLinkedList<T> implements IStack<T>{
    private StackNode<T> head; // Points to the first element
    private StackNode<T> top;  // Points to the last element 
    private int size;

    public StackLinkedList() {
        this.head = null;
        this.top = null;
        this.size = 0;
    }


    /**
     * Pushes an item onto the top of this stack.
     * 
     * @param item the item to be pushed onto this stack
     * 
     * Time complexity: O(1)
     */
    @Override
    public void push(T item) {
        StackNode<T> newTop = new StackNode<T>(item, null);
        if(isEmpty()) {
            this.head = this.top = newTop;
        } else {
        
            this.top.setNext(newTop);
            this.top = newTop;
        }
        this.size++;
    }

    /**
     * Removes the item at the top of this stack and returns that item.
     *
     * @return the item at the top of this stack, or null if the stack is empty
     *
     * Time complexity: O(n) in the worst case because it traverses the list to update the top pointer.
     */
    @Override
    public T pop() {
        if(isEmpty()) {
            System.out.println("Can't pop from an empty stack");
            return null;
        }
        T topData = this.top.getStackData(); 
        if (this.head == this.top) {
            this.head = this.top = null;
        } else {
            StackNode<T> walker = this.head;
            while(walker!= null && !walker.getNext().equals(this.top)) {
                walker = walker.getNext();
            }
            this.top = walker;
            this.top.setNext(null);
        }
        this.size--;
        return topData;
    }

    /**
     * Looks at the item at the top of this stack without removing it.
     * 
     * @return the item at the top of this stack, or null if the stack is empty
     * 
     * Time complexity: O(1)
     */
    @Override
    public T peek() {
        if (isEmpty()) {
            System.out.println("Can't peek from an empty stack");
            return null;
        }
        return this.top.getStackData();
    }

   /**
     * Tests if this stack is empty.
     *
     * @return true if and only if this stack contains no items; false otherwise
     *
     * Time complexity: O(1)
     */
    @Override
    public boolean isEmpty() {
      return this.head == null;
    }

      /**
     * Returns the 0-based position where an object is on this stack. If the object
     * occurs as an item in this stack, this method returns the distance from the
     * top of the stack of the occurrence nearest the top of the stack; the topmost
     * item on the stack is considered to be at distance 0.
     * 
     * @param object the desired object
     * @return the 0-based position from the top of the stack where the object is
     *         located; the return value -1 indicates that the object is not on the
     *         stack
     * 
     * Time complexity: O(n) in the worst case
     */
    @Override
    public int search(Object object) {
        if(isEmpty()) {
            return -1;
        }
        StackNode<T> walker = this.head;
        for(int i=0;walker!=null; i++) {
            if(walker.getStackData().equals(object)) {
                return this.size-i-1;
            } 
            walker = walker.getNext();
        }
        return -1;
    }

     /**
     * Returns the number of items in this stack.
     * 
     * @return the number of items in this stack
     * 
     * Time complexity: O(1)
     */
    @Override
    public int size() {
        return this.size;
    }


     /**
     * Reverses the stack.
     *
     * Time complexity: O(n)
     */
    @Override
    public void reverseStack() {
        StackNode<T> prevNode = null;
        StackNode<T> walker = this.head;
        StackNode<T> nextNode  = null;
        this.top = this.head;
        while(walker!= null) {
            nextNode = walker.getNext();
            walker.setNext(prevNode);
            prevNode = walker;
            walker = nextNode;
        }
        this.head = prevNode;
    }
}
