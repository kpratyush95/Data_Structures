package HashMap;

public class Entry<K,V> {
    final K key;
    V value;
    Entry<K,V> next;

    Entry(K key, V value) {
        this.key = key;
        this.value = value;
    }

    public V getValue() {
        return this.value;
    }

    public K getKey() {
        return this.key;
    }

    public void setValue(V value) {
        this.value = value;
    }
}
