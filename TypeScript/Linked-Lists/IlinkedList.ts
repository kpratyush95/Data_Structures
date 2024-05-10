/**
 * An interface for Linked lists, which shares the common methods.
 */
export interface ILinkedList<T> {
  isEmpty(): boolean;
  getIndex(index: number) : T| null| undefined;
  push(data: T): void;
  pop(): T| undefined;
  append(data: T): void;
  removeTail(): T| undefined;
  insertAt(index: number, data: T): void;
  removeAt(index: number): T| undefined;
  clear(): void;
  getLength(): number;
  toArray(): (T| undefined)[];
}