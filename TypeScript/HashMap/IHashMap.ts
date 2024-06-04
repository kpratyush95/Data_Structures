import { HashMapEntry } from "./HashMapEntry";

export interface IHashmap<K,V> {
    getSize(): number;
    set(key: K, value: V): void;
    get(key: K): V | null;
    delete(key: K): void;
    has(key: K): boolean;
    clear(): void;
    key(): K[];
    values(): V[];
    entries(): HashMapEntry<K,V>[];
}