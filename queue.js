import { LinkedList } from './linked-list.js';

class Queue {
  constructor() {
    this.items = [];
  }
  enqueue(value) {
    this.items.unshift(value);
  }
  dequeue() {
    return this.items.pop();
  }
  isEmpty() {
    return this.items.length === 0;
  }
  toArray() {
    return this.items.slice();
  }
}

class LinkedListQueue {
  constructor() {
    this.list = new LinkedList();
  }
  enqueue(value) {
    this.list.append(value);
  }
  dequeue() {
    this.list.deleteHead();
  }
  isEmpty() {
    this.list.isEmpty();
  }
  toArray() {
    return this.list.toArray();
  }
}

const queue = new LinkedListQueue();

