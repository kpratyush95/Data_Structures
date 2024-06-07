import { Entry } from "./Entry";

export interface IHashmap<K,V> {
    
    isEmpty(): boolean;
    
    get(key: K): V | undefined;
    
    put(key: K , value: V) : void;

    keySet() : Set<K>;

    values() : V[];

    entries() : Entry<K,V>[];
    
    remove(key: K): V | undefined;
    
    constainsKey(key: K) : boolean;
    
    clear(): void;
    
    resizeHashTable() : void;
    
    hashFunction(key: K) : number;
}