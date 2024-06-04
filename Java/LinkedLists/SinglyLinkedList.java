package LinkedLists;

import java.util.ArrayList;
import java.util.List;

/**
 * This is an implementation of Singly Linked List, 
 * Singly Linked List is a linear data structure has 
 * 2 elements data is of type T and a reference to the 
 * next list node.
 */

public class SinglyLinkedList <T> implements ILinkedList<T> {

	private SingleListNode<T> head = null;
	private SingleListNode<T> tail = null;
	private int size = 0;
	
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
	   if(index < 0 || index > size ) {
		throw new Error("Index out of bounds");
	   }
	   if(isEmpty()){
		return null;
	   }
	   SingleListNode<T> walker = head;
	   for(int i = 0; i < index-1; i++) {
		if(walker.next == null) {
			return null;
		}
		walker = walker.next;  
	   }
	   return walker.data;
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
		SingleListNode<T> node = new SingleListNode<T>(data);
		if(isEmpty()) {
			this.head = node;
		} else {
			node.next = this.head;
			this.head = node;
		}
	   this.size++;
	   return;
	}

	/**
     * Removes the 1st element from the list
     * O(1) operation
     * 
     * @returns SingleListNode data which has been removed or
     * throws an error if the list is empty.
     */
	@Override
	public T pop() {
		if(isEmpty() ){
			throw new Error("Can't pop from empty list");
		}
		SingleListNode<T> node = this.head;
		this.head = node.next;
		this.size--;
		return node.data;
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
			this.head = new SingleListNode<T>(data);
			this.head = this.tail;
			
		} else {
			this.tail.next = new SingleListNode<T>(data);
			this.tail = this.tail.next;
		}
		this.size++;
	}

	/**
     * Removes an element from the tail
     * This is a O(n) operation, as we need to
     * loop through all the elements to get the new
     * tail.
     * 
     * @returns the data of the element that has been
     * removed from the tail, or throws an error if the 
     * list is empty.
     */
	@Override
	public T removeTail() {
		if(isEmpty()) {
			throw new Error("Unable to remove from an empty list");
		}
		SingleListNode<T> currentTail = this.tail;
		if(this.head == this.tail){
			this.head = this.tail = null;
			this.size --;
			return currentTail.data;
		}
		
		SingleListNode<T> walker = this.head;
		while(walker != currentTail) {
			walker = walker.next;
		}
		this.tail = walker;
		this.size--;
		return currentTail.data;
	}

	/**
     * Inserts a node with the given data, at a given index.
     *
     * Time Complexity O(n)
     * 
     * @param index 
     * @param data 
     */
	@Override
	public void insertAt(int index, T data) {
		if(index < 0  || index > this.size) {
			throw new Error("Index out of Bounds");
		}
		SingleListNode<T> node = new SingleListNode<T>(data);
		if(index == 0) {
			node.next = this.head;
			this.head = node;
			this.size++;
			return;
		} if(index == size) {
			this.append(data);
			return;
		} 
		SingleListNode<T> walker = this.head;
		for(int i = 0; i< index -1; i++) {
			walker = walker.next;
		}
		node.next = walker.next;
		walker.next = node;
		this.size++;
		return;
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
			throw new Error("Index out of bounds");
		}
		if(isEmpty()) {
			throw new Error("Can't remove from an empty list");
		}
		SingleListNode<T> walker = this.head;
		if(index == 0) {
			this.head = head.next;
			this.size--;
			return walker.data;
		}
		if(index == this.size) {
			return removeTail();
		}
		
		for(int i=0; i < index -1; i++) {
			walker = walker.next;
		}
		SingleListNode<T> currentNode = walker.next;
		walker.next = currentNode.next;
		this.size --;
		return currentNode.data;
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
		SingleListNode<T> walker = this.head;
		while(walker != null) {
			arrList.add(walker.data);
			walker = walker.next;
		}
		return arrList;
	}

	 /**
     * Reverses the list and then returns the new head of the list
     * 
     * @returns the new head of the list
     */
	@Override
	public SingleListNode<T> reverse() {
		if(this.isEmpty()) {
			throw new Error("Cannot reverse an empty list");
		} if(this.size == 1){
			this.head = this.tail;
			return this.head;
		} 
		SingleListNode<T> walker = this.head;
		SingleListNode<T> previousNode = null;
		SingleListNode<T> nextNode = null;
		while(walker != null) {
			nextNode = walker.next;
			walker.next = previousNode;
			previousNode = walker;
			walker = nextNode;
		}
		this.head = previousNode;
		return this.head;
	}

}