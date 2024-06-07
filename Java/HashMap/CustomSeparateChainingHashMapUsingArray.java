package HashMap;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

public class CustomSeparateChainingHashMapUsingArray<K,V> implements ICustomHashMap<K,V> {
    
    private int size = 0;
    private LinkedList<Entry<K,V>>[] buckets;
    private float loadFactor = 0.75f;

    @Override
    public boolean isEmpty() {
        return this.size > 0;

    }

     /*
     * load factor = 0.75 means if we need to add 100 items and we have added
     * 75, then adding 76th item it will double the size, copy all elements
     * & then add 76th item.
    */
    @Override
    public void initBuckets(int length) {
        buckets = new LinkedList[length];
        for (int i = 0; i < buckets.length; i++) {
            buckets[i] = new LinkedList<>();
        }
    }


    @Override
    public V get(K key) {
        int bucketIndex = hashFunction(key);
        LinkedList<Entry<K,V>> entryList = buckets[bucketIndex];
        for (Entry<K,V> entry : entryList) {
            if(entry.key.equals(key)) {
                return entry.value;
            }
        }
        return null;
    }

    @Override
    public void put(K key, V value) {
        int bucketIndex = hashFunction(key);
        LinkedList<Entry<K,V>> entryList = buckets[bucketIndex];
        for (Entry<K,V> entry : entryList) {
            if(entry.key.equals(key)) {
                entry.value = value;
                return;
            }
        }
        entryList.add(new Entry<K,V>(key, value));
        this.size++;

        if((float)size/buckets.length > loadFactor ) {
            resizeHashTable();
        }
    }

    @Override
    public Entry<K,V> remove(K deleteKey) {
        if(!containsKey(deleteKey)) {
            return null;
        }
        int bucketIndex = hashFunction(deleteKey);
        LinkedList<Entry<K,V>> entryList = buckets[bucketIndex];
        Entry<K,V> nodeToBeRemoved= null;
        for (Entry<K,V> entry : entryList) {
            if(entry.key.equals(deleteKey)) {
                nodeToBeRemoved = entry;
            }
        }
        entryList.remove(nodeToBeRemoved);
        size--;
        return nodeToBeRemoved;
    }


    @Override
    public boolean containsKey(K key) {
        return get(key) != null;
    }

    @Override
    public void clear() {
        for(int i=0; i< buckets.length; i++) {
            buckets[i].clear();
        }
        this.size = 0;
    }

    @Override
    public void resizeHashTable() {
        System.out.println("Resizing the Hash Table O(n^3) Operation");
        LinkedList<Entry<K,V>>[] oldEntryList = buckets;
        initBuckets(oldEntryList.length *2);
        for (LinkedList<Entry<K,V>> oldEntries : oldEntryList) {
            for (Entry<K,V> entry : oldEntries) {
                put(entry.key, entry.value);
            }
        }
    }

    @Override
    public int hashFunction(K key) {
        int hashCode = key.hashCode();
        return Math.abs(hashCode) % buckets.length;
    }

    @Override
    public Set<K> keySet() {
       Set<K> keySet = new HashSet<K>();
        for(int i=0; i< this.buckets.length; i++) {
            LinkedList<Entry<K,V>> entryList = this.buckets[i];
            for (Entry<K,V> entry : entryList) {
                keySet.add(entry.key);
            }
        }
       return keySet;
    }

    @Override
    public List<V> values() {
        List<V> valuesList = new ArrayList<>();
        for(int i=0; i< this.buckets.length; i++) {
            LinkedList<Entry<K,V>> entryList = this.buckets[i];
            for (Entry<K,V> entry : entryList) {
                valuesList.add(entry.value);
            }
        }
        return valuesList;
    }

    @Override
    public List<Entry<K, V>> entries() {
        List<Entry<K,V>> entriesList = new ArrayList<>();
        for(int i=0; i< this.buckets.length; i++) {
            LinkedList<Entry<K,V>> entryList = this.buckets[i];
            for (Entry<K,V> entry : entryList) {
                entriesList.add(entry);
            }
        }
        return entriesList;
    }


    
}
