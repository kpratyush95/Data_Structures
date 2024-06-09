package HashMap;

public class LinearProbingEntry<K,V> implements IEntry<K,V> {
    private K key;
    private V value;
    private boolean isDeleted = false;

    public LinearProbingEntry(K key, V value) {
        this.key = key;
        this.value = value;
        this.isDeleted = false;
    }

    public K getKey() {
        return this.key;
    }

    public void setKey(K key) {
        this.key = key;
    }

    public V getValue() {
        return this.value;
    }

    public void setValue(V value) {
        this.value = value;
    }

    public boolean isIsDeleted() {
        return this.isDeleted;
    }

    public boolean getIsDeleted() {
        return this.isDeleted;
    }

    public void setIsDeleted(boolean isDeleted) {
        this.isDeleted = isDeleted;
    }
}
