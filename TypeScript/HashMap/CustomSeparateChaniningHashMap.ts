import { Entry } from "./Entry";
import { SinglyLinkedList } from "../Linked-Lists/SinglyLinkedList";
import { IHashmap } from "./IHashMap";
import { ListNode } from "../Linked-Lists/SingleListNode";

export default class CustomHashMap<K,V> implements IHashmap <K,V> {

    private size: number;
    private buckets: any[];
    private readonly loadFactor: 0.75;
    private keys:{[key:string]: number};

    isEmpty(): boolean {
        return this.size > 0;
    }
    constructor(length = 5) {
        this.buckets = Array(length).fill(undefined).map(() => new SinglyLinkedList<Entry<K,V>>());
        this.keys = {};
    }
    get(key: K): V | undefined {
        const bucketIndex: number = this.hashFunction(key);
        const entriesList:SinglyLinkedList<Entry<K,V>> = this.buckets[bucketIndex];
        const entry = entriesList.find({ callback : (listNode) => listNode.key === key})
        return entry? entry.data.value : undefined ;
    }
    put(key: K, value: V): void {
        const bucketIndex: number = this.hashFunction(key);
        const entriesList: SinglyLinkedList<Entry<K,V>> = this.buckets[bucketIndex];
        const stringKey = String(key);
        this.keys[stringKey] = bucketIndex;
        const existingEntry = entriesList.find({ callback: (listNode) => listNode.key === key});
        if ( existingEntry ) {
            existingEntry.data.value = value;
        } else {
            this.size++;
            entriesList.append(new Entry<K, V>(key, value));
        }
        if(this.size/this.buckets.length > this.loadFactor) {
            this.resizeHashTable();
        }
    }
    keySet(): Set<K> {
        const keySet = new Set<K>();

        for (const stringKey of Object.keys(this.keySet)) {
            keySet.add(stringKey as unknown as K);
        }
        return keySet;
    }
    values(): V[] {
        return this.buckets.reduce<V[]>((values, bucket) => {
            const bucketValues = bucket.toArray().map((entry: ListNode<Entry<K,V>>) => entry.data.value);
            return values.concat(bucketValues);
        }, [] as V[]);
    }
    entries(): Entry<K, V>[] {
        return this.buckets.reduce<Entry<K,V>[]>((entries, bucket) => {
            const bucketEntry = bucket.toArray.map((entry : ListNode<Entry<K,V>>) => ({
                key: entry.data.key,
                value: entry.data.value,
            }));
            return entries.concat(bucketEntry);    
        }, [] as Entry<K,V>[]);
    }
    remove(key: K) : V | undefined {
        const bucketIndex: number = this.hashFunction(key);
        delete this.keySet[String(key)];
        const entriesList: SinglyLinkedList<Entry<K,V>> = this.buckets[bucketIndex];
        const existingEntry = entriesList.find({callback : (listNode) => listNode.key === key});
        if(existingEntry) {
            return entriesList.delete(existingEntry.data)?.value;
        }

    }
    constainsKey(key: K): boolean {
        const stringKey = String(key);
        return stringKey in this.keys;
    }
    clear(): void {
        this.buckets.forEach(bucket => {
            bucket.clear();
        });
        this.size = 0;
    }
    resizeHashTable(): void {
        const newCapacity = this.buckets.length * 2;
        const newBuckets : SinglyLinkedList<Entry<K,V>>[] = this.buckets.reduce((newBucketAccumulator, bucket) => {
            bucket.toArray().forEach((entryNode:ListNode<Entry<K,V>>) => {
                const entry = entryNode.data;
                const newIndex = this.hashFunction(entry.key);
                if(!newBucketAccumulator[newIndex]) {
                    newBucketAccumulator[newIndex] = SinglyLinkedList<Entry<KeyboardEvent,V>>;
                }
                newBucketAccumulator[newIndex].append(entry);
            });
            return newBucketAccumulator;
        }, Array.from({length: newCapacity}));
        this.buckets = newBuckets;
    }
    hashFunction(key: K): number {
    /** 
    *    For simplicity reasons we will just use character codes sum of all characters of the key
    *   to calculate the hash.
    *    But you may also use more sophisticated approaches like polynomial string hash to reduce the
    *    number of collisions:
    *    hash = charCodeAt(0) * PRIME^(n-1) + charCodeAt(1) * PRIME^(n-2) + ... + charCodeAt(n-1)
    *   where charCodeAt(i) is the i-th character code of the key, n is the length of the key and
    *    PRIME is just any prime number like 31.
    */   
     const hash = Array.from(String(key)).reduce(
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0
        );
        return hash % this.buckets.length;
    }

}