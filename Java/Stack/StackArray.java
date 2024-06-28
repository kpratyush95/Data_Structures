package Stack;
@SuppressWarnings("unchecked")
public class StackArray<T> implements IStack<T> {

    private static final int DEFAULT_CAPACITY = 10;
    private int capacity;
    private T[] stackArray;
    private int top;


    /**
     * Default constructor that initializes the stack with default capacity.
     */
    public StackArray() {
        this(DEFAULT_CAPACITY);
    }

    /**
     * Constructor that initializes the stack with a specified capacity.
     * 
     * @param capacity the initial capacity of the stack.
     */
    public StackArray(int capacity) {
        this.stackArray = (T[])new Object [capacity];
        this.top = -1;
        this.capacity = capacity;
    }

     /**
     * Pushes an item onto the top of this stack. If the stack is full, it resizes
     * the array to double its current capacity.
     * 
     * @param item the item to be pushed onto this stack.
     * 
     * Time complexity: O(1) amortized, O(n) in the worst case when resizing occurs.
     */
    @Override
    public void push(T item) {
        if((this.top +1) >= this.capacity) {
            this.resize(this.capacity*2);
        }
        stackArray[++top] = item;
    }

    /**
     * Removes the item at the top of this stack and returns that object.
     * 
     * @return the item at the top of this stack, or null if the stack is empty.
     * 
     * Time complexity: O(1).
     */
    @Override
    public T pop() {
       if(!isEmpty()) {
        return stackArray[top--];
       } else {
        System.out.println("Can't pop from an empty stack");
        return null;
       }
    }

    /**
     * Looks at the item at the top of this stack without removing it.
     * 
     * @return the item at the top of this stack, or null if the stack is empty.
     * 
     * Time complexity: O(1).
     */
    @Override
    public T peek() {
        if(!isEmpty()) {
            return stackArray[top];
        } else {
            System.out.println("Can't peek from an empty stack");
            return null;
        }
    }

    /**
     * Tests if this stack is empty.
     * 
     * @return true if and only if this stack contains no items; false otherwise.
     * 
     * Time complexity: O(1).
     */
    @Override
    public boolean isEmpty() {
        return top == -1;
    }

    /**
     * Returns the 1-based position where an object is on this stack. If the object
     * o occurs as an item in this stack, this method returns the distance from the
     * top of the stack of the occurrence nearest the top of the stack; the topmost
     * item on the stack is considered to be at distance 1.
     * 
     * @param object the desired object.
     * @return the 1-based position from the top of the stack where the object is
     *         located; the return value -1 indicates that the object is not on the
     *         stack.
     * 
     * Time complexity: O(n) in the worst case.
     */
    @Override
    public int search(Object object) {
        if(isEmpty()) {
            return -1;
        } else {
            for (int i =0; i<= top; i++) {
                if(stackArray[i].equals(object)) {
                    return top - i + 1; // Return 1-based position
                }
            }
            return -1;
        }
    }

      /**
     * Returns the number of items in this stack.
     * 
     * @return the number of items in this stack.
     * 
     * Time complexity: O(1).
     */
    @Override
    public int size() {
        return this.top+1;
    }

     /**
     * Resizes the array to the new specified capacity.
     * 
     * @param newCapacity the new capacity of the stack array.
     * 
     * Time complexity: O(n).
     */
    public void resize(int newCapacity) {
        T[] resizedStack = (T[]) new Object[newCapacity];
        /*
         * this.stackArray : The source Array
         * srcPos: starting position of the source array
         * resizedStack: The destination Array
         * destPos: the starting position in the destination array
         * this.top+1: The number of elements to be copied (since top is the index of the last element in the stack). 
         */
        System.arraycopy(this.stackArray, 0, resizedStack, 0, this.top + 1);
        // This reference change might be nice in here
        this.stackArray = resizedStack;
        this.capacity = newCapacity;
    }

     /**
     * Reverses the stack.
     *
     * Time complexity: O(n)
     */
    @Override
    public void reverseStack() {
       if(this.isEmpty()) {
        System.out.println("Can't reverse an empty stack");
        return;
       }
       T[] reversedStackArray = (T[])new Object[capacity];
       int currentIndex = 0;
       while(!this.isEmpty()) {
            reversedStackArray[currentIndex++] = this.pop();
       }
       stackArray = reversedStackArray;
       this.top = currentIndex-1;
    }

}
