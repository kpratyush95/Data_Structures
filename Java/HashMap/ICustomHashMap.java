package HashMap;

public interface ICustomHashMap<K,V> {

    public boolean isEmpty();

    public V get(K key);

    public void put(K key, V value);

    public Entry<K,V> remove(K deleteKey);

    public boolean containsKey(K key);

    public void clear();

    public void resizeHashTable();

    //  tells which bucket to go to
    public int hashFunction(K key);

}
