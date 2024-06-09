
/**
 * Represents a key-value pair.
 *
 * @template K The type of the key.
 * @template V The type of the value.
 * @param key The key.
 * @param value The value.
 */
export class Entry <K, V> {
    key: K;
    value: V;
    isDeleted?:boolean;

    constructor (key: K, value: V) {
        this.key = key;
        this.value = value;
        this.isDeleted = false;
    }
}