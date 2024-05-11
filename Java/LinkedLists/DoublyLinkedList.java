package Java.LinkedLists;

import java.util.ArrayList;
import java.util.List;


public class DoublyLinkedList<T> implements ILinkedList<T> {

    private DoubleListNode<T> head = null;
    private DoubleListNode<T> tail = null;
    private int size =0;

   /**
	 * Checks if the list is empty
	 * 
	 * @returns boolean, Whether the list is empty or not.
	 */
	@Override
	public boolean isEmpty() {
	   return this.head == null;
	}

	@Override
	public int size() {
	   return this.size;
	}

	/**
	 * Gets the data of the node at the give index.
	 * Time Complexity: Linear O(n)
	 * 
	 * @param index
	 * @returns The data of the node at the given index or
	 */
    @Override
    public T getIndex(int index) {
       DoubleListNode<T> walker = this.head;
       if(isEmpty()) {
        throw new Error("Cannot retrieve data from an empty list");
       }
       if(index == 0) {
        return this.head.data;
       } else if(index == this.size) {
        return this.tail.data;
       } else {
        for(int i = 0; i < index; i++) {
            if(walker.next == null) {
                return null;
            }
            walker = walker.next;
        }
        return walker.data;
       }

    }

     /**
     * Adds a given data to the first node of the list
     * O(1) Operation
     * @param data to be inserted
     * 
     * @return void
     */
    @Override
    public void push(T data) {
        if(isEmpty()) {
            this.head = new DoubleListNode<T>(data);
        } else {
            DoubleListNode<T> newNode = new DoubleListNode<T>(data);
            newNode.next = this.head;
            this.head.previous = newNode;
            this.head = newNode;
        }
        this.size++;
    }

    /**
     * Removes the 1st element from the list
     * O(1) operation
     * 
     * @returns listNode data which has been removed or
     * throws an error if the list is empty.
     */
    @Override
    public T pop() {
        if(isEmpty()) {
            throw new Error("Cannot remove from an empty list");
        }
        this.size--;
        if(this.size == 1) {
            DoubleListNode<T> node = this.head;
            this.head = this.tail = null;
            return node.data;
        } else {
            DoubleListNode<T> node = this.head;
            this.head= this.head.next;
            this.head.previous = null;
            return node.data;
        }
    }

    /**
     * Inserts the given data as a new node after the 
     * current tail. It is a O(1) operation
     * 
     * @param data 
     */
    @Override
    public void append(T data) {
       if(isEmpty()) {
        this.head = this.tail = new DoubleListNode<T>(data);
        
       } else {
        DoubleListNode<T> newNode = new DoubleListNode<T>(data);
        newNode.previous = this.tail;
        this.tail.next = newNode;
        this.tail = newNode; 
       }
       this.size++;
    }

    @Override
    public T removeTail() {
       if(isEmpty()) {
        throw new Error("unable to remove from ");
       }
       DoubleListNode<T> currentTail = this.tail;
       if(this.head == this.tail) {
        this.size--;
        this.head = this.tail = null;
        return currentTail.data;
       }
       this.size--;
       this.tail.previous.next = null;
       this.tail = this.tail.previous;
       return currentTail.data;
    }

    @Override
    public void insertAt(int index, T data) {
        if(index < 0 || index > this.size) {
            throw new Error("Index out of Bounds");
        }
        if(this.isEmpty()) {
            this.push(data);
        } else if(index == this.size) {
            this.append(data);
        } else {
            this.size++;
            DoubleListNode<T> walker = this.head;
            for(int i=0; i<index-1; i++) {
                walker = walker.next;
            }
            DoubleListNode<T> nextNode = walker.next;
            DoubleListNode<T> newNode = new DoubleListNode<T>(data);
            
            newNode.previous = walker;
            newNode.next = nextNode;
            walker.next = newNode;
            nextNode.previous = newNode;
        }
    }

    /**
     * Removes an element from the list at a given index.
     * 
     * Time Complexity O(n)
     * @param index 
     * @returns data of the node that has been removed
     */
    @Override
    public T removeAt(int index) {
        if(index < 0 || index > this.size) {
            throw new Error("Index out of bonds");
        } 
        if(this.isEmpty()) {
            throw new Error("Cannot remove from an empty list");
        }
        if(index == 0 ) {
           return this.pop()
        } else if(index == this.size) {
           return this.removeTail();
        } else {
            DoubleListNode<T> walker = this.head;
            for(int i=0; i< index-1; i++) {
                walker = walker.next;
            }
            DoubleListNode<T> nextNode = walker.next;
            walker.previous.next = nextNode;
            nextNode.previous = walker.previous;
            this.size--;
            return walker.data;
        }
    }

	/**
     * Clears the list
     */
	@Override
	public void clear() {
		this.head = null;
	}

	 /**
     * Traverses through the linked list and generates an array of the data
     * 
     * O(n)
     * 
     * @returns an array conating the data of the linked list
     */
	@Override
	public List<T> toArray() {
		List<T> arrList = new ArrayList<T>();
		DoubleListNode<T> walker = this.head;
		while(walker != null) {
			arrList.add(walker.data);
			walker = walker.next;
		}
		return arrList;
	}

     /**
     * Traverses through the linked list and generates an array of the data
     * 
     * O(n)
     * 
     * @returns an array conating the data of the linked list
     */
    @Override
    public IListNode<T> reverse() {
       if(isEmpty()) {
            throw new Error("Cannot reverse an empty list");
       } if(this.head == this.tail) {
        return this.head;
       }
       DoubleListNode<T> walker = this.head;
       DoubleListNode<T> previousNode = null;
       DoubleListNode<T> nextNode = null;
       while(walker != null) {
        previousNode = walker.previous;
        nextNode = walker.next;

        walker.previous = nextNode;
        walker.next = previousNode;

        previousNode = walker;
        walker = nextNode;
       }
       this.tail = this.head;
       this.head = previousNode;
       return this.head;
    }
    
}
