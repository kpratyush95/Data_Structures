package HashMap;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class CustomLinearProbingHashMap<K,V> implements ICustomHashMap<K,V> {

    private float loadFactor = 0.75f;
    private int size;
    private int capacity;
    private LinearProbingEntry<K,V>[] buckets;

    @Override
    public boolean isEmpty() {
        return this.size == 0;
    }

    @SuppressWarnings("unchecked")
    @Override
    public void initBuckets(int length) {
        this.capacity = length;
        this.buckets =  new LinearProbingEntry[capacity];
    }

    /**
    * Average case O(1), Worst case O(n)
    * Retrieves the value associated with the specified key.
    */
    @Override
    public V get(K key) {
        int bucketIndex = findKey(key);
        if(
            bucketIndex != -1
            && this.buckets[bucketIndex]!= null
            && !this.buckets[bucketIndex].getIsDeleted()
        ) {
            return this.buckets[bucketIndex].getValue();
        }
        return null;
    }

    /**
    * Average case O(1), Worst case O(n)
    * Inserts a key-value pair into the hash table. Resizes the table if necessary.
    */
    @Override
    public void put(K key, V value) {
        int bucketIndex = this.findKey(key);
        if(bucketIndex != -1 
            && !this.buckets[bucketIndex].getIsDeleted()
        ) {
            this.buckets[bucketIndex].setValue(value);
            return;
        }
        int load = (this.size+1)/this.capacity;
        if(load > this.loadFactor) {
            this.resizeHashTable();
        }
        int newIndex = this.findEmptyIndex(key);
        this.buckets[newIndex] = new LinearProbingEntry<K,V>(key, value);
        this.size++;        
    }

    /**
    * O(n)
    * Returns a set of all keys in the hash table.
    */
    @Override
    public Set<K> keySet() {
        Set<K>keys = new HashSet<>();
        for (LinearProbingEntry<K,V> entry : this.buckets) {
            if(entry!= null && !entry.getIsDeleted()) {
                keys.add(entry.getKey());
            }
        }
        return keys;
    }

    /**
    * O(n)
    * Returns a list of all values in the hash table.
    */
    @Override
    public List<V> values() {
        List<V>values = new ArrayList<>();
        for (LinearProbingEntry<K,V> entry : this.buckets) {
            if(entry!= null && !entry.getIsDeleted()) {
                values.add(entry.getValue());
            }
        }
        return values;
    }

    /**
    * O(n)
    * Returns a list of all entries in the hash table.
    */
    @Override
    public List<IEntry<K, V>> entries() {
        List<IEntry<K, V>>values = new ArrayList<>();
        for (LinearProbingEntry<K,V> entry : this.buckets) {
            if(entry!= null && !entry.getIsDeleted()) {
                values.add(entry);
            }
        }
        return values;
    }

    /**
    * Average case O(1), Worst case O(n)
    * Removes the entry with the specified key from the hash table.
    */
    @Override
    public IEntry<K, V> remove(K deleteKey) {
        int bucketIndex = this.findKey(deleteKey);
        if(bucketIndex != -1 ) {
            this.buckets[bucketIndex].setIsDeleted(true);
            this.size--;
            return new LinearProbingEntry<K,V>(buckets[bucketIndex].getKey(),buckets[bucketIndex].getValue());
        }
        return null;
    }

    /**
    * Average case O(1), Worst case O(n)
    * Checks if the hash table contains the specified key.
    */
    @Override
    public boolean containsKey(K key) {
        return this.keySet().contains(key);
    }

    /**
    * O(n)
    * Clears the hash table.
    */
    @Override
    public void clear() {
        Arrays.fill(buckets, null);
        size = 0;
    }

    /**
    * O(n^2)
    * Resizes the hash table and rehashes all non-deleted entries.
    */
    @Override
    public void resizeHashTable() {
        System.out.println("Resizing the Hash Table O(n^2) Operation");
        LinearProbingEntry<K,V>[] oldEntries = this.buckets;
        this.initBuckets(oldEntries.length*2);
        this.size =0;
        for (LinearProbingEntry<K,V> bucketEntry : oldEntries) {
            if(bucketEntry != null && !bucketEntry.getIsDeleted()){
                this.put(bucketEntry.getKey(), bucketEntry.getValue());
            }
        }
    }

    /**
    * O(|key|)
    * Computes the hash of the key.
    */
    @Override
    public int hashFunction(K key) {
        // int hashCode = key.hashCode();
        // return Math.abs(hashCode) % this.capacity;
        int hash = 0;
        String strKey = String.valueOf(key);
        for (int i = 0; i < strKey.length(); i++) {
            char ch = strKey.charAt(i);
            hash = (hash << 5) - hash + ch;
            hash |= 0; // Convert to 32-bit integer
        }
        return hash % buckets.length;
    }

    /**
    * Average case O(1), Worst case O(n)
    * Finds the key in the hash table.
    */
    private int findKey(K key){
        int bucketIndex = this.hashFunction(key);
        if (
            this.buckets[bucketIndex] != null
            && !this.buckets[bucketIndex].getIsDeleted()  
            && this.buckets[bucketIndex].getKey() == key
        ) {
            return bucketIndex;
        }
        int step = 1;
        int currentIndex = this.getNextIndex(bucketIndex, key, step);
        while (currentIndex != bucketIndex ) {
            if ( 
                this.buckets[bucketIndex] != null
                && !this.buckets[bucketIndex].getIsDeleted()  
                && this.buckets[bucketIndex].getKey() == key
            ) {
                return currentIndex;
            }
            currentIndex = this.getNextIndex(currentIndex, key, step++);
        }
        return -1;
    }

    /**
    * O(1)
    * Gets the next index for linear probing.
    */
    private int getNextIndex(int index, K key, int step) {
        return (index+step) % this.capacity;
    }

    /**
    * Average case O(1), Worst case O(n)
    * Finds the next empty index in the hash table.
    */
    private int findEmptyIndex(K key) {
        int index = this.hashFunction(key);
        int step =1;
        while(
            this.buckets[index]!= null
            && !this.buckets[index].getIsDeleted()
        ) {
            index = this.getNextIndex(index, key, step++);
        }
        /**
         *   if (buckets[bucketIndex] == null || buckets[bucketIndex].isIsDeleted())
         */
        return index;
    }
    
}
