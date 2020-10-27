class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(value) {
    const newNode = {
      value: value,
      next: null,
    };

    if (this.tail) {
      this.tail.next = newNode;
    }

    this.tail = newNode;

    if (!this.head) {
      this.head = newNode;
    }
  }

  prepend(value) {
    const newNode = {
      value: value,
      next: this.head,
    };
    this.head = newNode;

    if (!this.head) {
      this.tail = newNode;
    }
  }

  delete(value) {
    if (!this.head) {
      return false;
    }

    while (this.head && this.head.value === value) {
      this.head = this.head.next;
    } //Ensure if the delete value is equal to the head node. !important

    let curNode = this.head;

    while (curNode.next) {
      if (curNode.next.value === value) {
        curNode.next = curNode.next.next;
      }
      curNode = curNode.next;
    }

    if (this.tail.value === value) {
      this.tail = curNode;
    }
  }

  deleteHead() {
    if (!this.head) {
      return null;
    }
    const deletedItem = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedItem;
  }

  find(value) {
    if (!this.head) {
      return false;
    }

    let curNode = this.head;

    while (curNode) {
      if (curNode.value === value) {
        return curNode;
      }
      curNode = curNode.next;
    }
  }

  insertAfter(value, position) {
    const existNode = this.find(position);

    if (existNode) {
      const newNode = {
        value: value,
        next: existNode.next,
      };
      existNode.next = newNode;

      if (existNode.value === this.tail.value) {
        this.tail = newNode;
      }

      return true;
    }

    return false;
  }

  toArray() {
    const elements = [];
    let curNode = this.head;

    while (curNode) {
      elements.push(curNode);
      curNode = curNode.next;
    }

    return elements;
  }
}

export {
  LinkedList,
}