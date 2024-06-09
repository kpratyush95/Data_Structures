import { callbackify } from "util";
import { Entry } from "./Entry";
import { IHashmap } from "./IHashMap";

export class CustomLinearProbingHashMap<K,V> implements IHashmap <K,V> {

    private size: number;
    private capacity: number;
    private loadFactor: number;
    // undefined for deleted entries
    private buckets: Array<Entry<K,V>>;
    private keys: { [key: string]: number }; // Object to store keys

    constructor(loafFactor: number = 0.75, capacity: number = 8) {
        this.size = 0;
        this.capacity = capacity;
        this.loadFactor = loafFactor;
        this.buckets = new Array<Entry<K,V>>(this.capacity);
        this.keys = {};
    }

    /**
     * Checks if the Hash Table is Empty
     * O(1) operation
     * @returns boolean
     */
    isEmpty(): boolean {
        return this.size === 0;
    }

    /**
     * Gets the next Available index as per Linear Probing
     * O(1) operation
     * @param index 
     * @param key 
     * @param step 
     * @returns number
     */
    getNextIndex(index: number, key: K, step: number) : number {
        return (index+step) % this.capacity;
    }

     /**
     * Loops through the Hash Table and checks if the 
     * key is present returns the index returns -1
     * if no key is present.
     * Average case O(1), Worst case O(n)
     * In the average case, it is O(1) due to the uniform distribution of keys.
     * In the worst case, if many collisions occur, it can degrade to O(n).
     * @param key
     * @returns number
     */
     private findKey(key : K, callback:(index: number, key: K, step: number) => boolean): number {
        let index = this.hashFunction(key);
        if ( this.buckets[index] !== undefined
            && this.buckets[index].isDeleted === false
            && this.buckets[index].key === key) {
            return index;
        }
        let step = 1;
        let currentIndex = this.getNextIndex(index, key, step++);
        while (currentIndex != index) {
            if ( callback(currentIndex, key, step)) {
                return currentIndex;
            }
            currentIndex = this.getNextIndex(index, key, step++);
        } 
        /**
         * It means that the key is not in the hashtable
         * and we return -1
         */
        return -1;
    }
    /**
     * Get the Value for the given Key
     * Average case O(1), Worst case O(n)
     * In the average case, the time complexity is O(1) due to the uniform distribution of keys.
     * In the worst case, if there are many collisions, it can degrade to O(n).
     * @param key 
     * @returns V | undefined
     */
    get(key: K): V | undefined {
        const index: number = this.findKey(key, (currentIndex, currentKey) => {
            return this.buckets[currentIndex] !== null
                && !this.buckets[currentIndex].isDeleted
                && this.buckets[currentIndex].key === currentKey;
        });
        if(
            index !== -1
            && this.buckets[index] !== null
            && !this.buckets[index].isDeleted
            ){
            return this.buckets[index].value;
        }
        return undefined;
    }
    /**
     * Adds a new Key Value pair in the Hash Table
     * If the table is nearly full, we resize the HashTable
     * If there is an existing key in the hashtable we update the value
     * Average case O(1), Worst case O(n)
     * In the average case, inserting an element is O(1).
     * In the worst case, if the table is nearly full and many collisions occur, it can degrade to O(n).
     * 
     * @param key 
     * @param value 
     * @returns none
     */
    put(key: K, value: V): void {
      const bucketIndex: number = this.findKey(key, (currentIndex, currentKey) => {
        return (
            this.buckets[currentIndex] !== null
            && this.buckets[currentIndex]?.key === currentKey
            && !this.buckets[currentIndex]?.isDeleted
            );
        });
        /**
         *  Don't need to check the buckets[bucketIndex].key === key
         *  as the findKey is basically doing the same
        */
        if (
            bucketIndex !== -1 
            && !this.buckets[bucketIndex].isDeleted) {
            this.buckets[bucketIndex].value = value;
            return;
        }
        const load = (this.size+1)/this.capacity;
        if(load > this.loadFactor) {
            this.resizeHashTable();
        }
        const newIndex = this.findEmptyIndex(key);
        this.buckets[newIndex] = new Entry<K,V>(key, value);
        this.keys[key as unknown as string] = newIndex;
        this.size++;
    }
    /**
     * 
     * @returns the Set of Keys in the Hash Table
     * O(n)
     */
    keySet(): Set<K> {
        return new Set(Object.keys(this.keys) as any);
    }
    /**
     * 
     * @returns The Array of Values in the HashTable
     * O(n)
     */
    values(): V[] {
        return this.buckets.filter(entry => entry !== null && !entry.isDeleted).map(entry => entry.value!);
    }

    /**
     * Returns the Array of Entries in the HashTable
     * O(n)
     */
    entries(): Entry<K, V>[] {
        return this.buckets.filter(entry => entry !== null && !entry.isDeleted) as Entry<K,V>[];
    }

    /**
     * Removes the Given Key from the Hash Table
     * Average case O(1), Worst case O(n)
     * In the average case, finding and marking an entry as deleted is O(1).
     * In the worst case, if many collisions occur, it can degrade to O(n).
     * 
     * @param key 
     * @returns Value if thre exists a key or undefined
     */
    remove(key: K): V | undefined {
        const bucketIndex: number = this.findKey(key, (currentIndex, currentKey) => {
            return (
                this.buckets[currentIndex]!== null
                && !this.buckets[currentIndex].isDeleted 
                && this.buckets[currentIndex].key === currentKey
            );
        });
        if (
            bucketIndex !== -1
            && this.buckets[bucketIndex] !== null
            ) {
            this.buckets[bucketIndex].isDeleted = true;
            delete this.keys[key as unknown as string];
            this.size--;
            return this.buckets[bucketIndex].value;
        }
        return undefined;
    }

    /**
     * Checking the presence of a key in the keys object is a constant-time operation.
     * @param key 
     * @returns boolean
     */
    constainsKey(key: K): boolean {
        return this.keys.hasOwnProperty(key as unknown as string);
    }

    /**
     * Initializes the buckets array and the keys object.
     * O(n)
     */
    clear(): void {
        this.buckets.fill(new Entry<K,V>(undefined as unknown as K, undefined as unknown as V));
        this.size = 0;
        this.keys = {};    
    }
    /**
     * Rehashes all entries in the hash table.
     * O(n)
     */
    resizeHashTable(): void {
        const oldBuckets = this.buckets;
        this.capacity*=2;
        this.buckets = Array.from({length: this.capacity}, () =>  new Entry<K, V>(null as unknown as K, null as unknown as V));
        this.size = 0;
        this.keys = {};
        oldBuckets.forEach(bucketEntry => {
            if (
                !bucketEntry.isDeleted
            ) {
                this.put(bucketEntry.key, bucketEntry.value);
            }
        });
    }

    /**
     * Computes the Hash of the key
     * O(|key|) The time complexity depends on the length of the key.
     * @param key 
     * @returns 
     */
    hashFunction(key: K): number {
        // return Number(key) % this.capacity;
        let hash = 0;
        const strKey = String(key);
        for (let i = 0; i < strKey.length; i++) {
            const char = strKey.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash |= 0;
        }
        return hash % this.capacity;

    }

    /**
     * Finds the next Empty index in the Hash Table
     * Average case O(1), Worst case O(n)
     * In the average case, it is O(1) due to the uniform distribution of keys.
     * In the worst case, if many collisions occur, it can degrade to O(n).
     * @param key 
     * @returns 
     */
    private findEmptyIndex(key: K): number {
        let index = this.hashFunction(key);
        let step = 1;
        while (this.buckets[index] !== null && !this.buckets[index]?.isDeleted) {
            index = this.getNextIndex(index, key, step++);
        }
        return index;
    }

}
