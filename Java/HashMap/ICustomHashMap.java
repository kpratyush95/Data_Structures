package HashMap;

import java.util.List;
import java.util.Set;

public interface ICustomHashMap<K,V> {

    public boolean isEmpty();

    public void initBuckets(int length);

    public V get(K key);

    public void put(K key, V value);

    public Set<K> keySet();

    public List<V> values();

    public List<IEntry<K,V>> entries();

    public IEntry<K,V> remove(K deleteKey);

    public boolean containsKey(K key);

    public void clear();

    public void resizeHashTable();

    //  tells which bucket to go to
    public int hashFunction(K key);

}
