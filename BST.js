class Node {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
  add(value) {
    if (this.value === null) {
      this.value = value;
      return;
    }

    if (this.value < value) {
      if (this.right) {
        this.right.add(value);
        return;
      }
      const newNode = new Node(value);
      newNode.parent = this;
      this.right = newNode;
      return;
    } else if (this.value > value) {
      if (this.left) {
        this.left.add(value);
        return;
      }
      const newNode = new Node(value);
      newNode.parent = this;
      this.left = newNode;
      return;
    }
  }
  find(value) {
    if (this.value === value) {
      return this;
    }
    
    if (this.value < value && this.right) {
      return this.right.find(value);
    } else if (this.value > value && this.left) {
      return this.left.find(value);
    }
  }

  remove(value) {
    const identifieNode = this.find(value);
    if (!identifieNode) {
      throw new Error ('Could not find node with that value');
    }

    if (!identifieNode.left && !identifieNode.right) {
      const identifiedParent = identifieNode.parent;
      identifiedParent.removeChild(identifieNode);
      return;
    }

    if (identifieNode.left && identifieNode.right) {
      const nextBiggerNode = identifieNode.right.findNext();
      console.log('bigger', nextBiggerNode);
      if (nextBiggerNode !== identifieNode.right.value) {
        this.remove(nextBiggerNode.value);
        identifieNode.value = nextBiggerNode.value;
        identifieNode.left.parent = identifieNode;
      } else {
        identifieNode.value = identifieNode.right.value;
        identifieNode.right = identifieNode.right.right;
      }
    } else {
      const childNode = identifieNode.left || identifieNode.right;
      identifieNode.left = childNode.left;
      identifieNode.right = childNode.right;
      identifieNode.value = childNode.value;
    }
    if (identifieNode.left) {
      identifieNode.left.parent = identifieNode;
    } else if (identifieNode.right) {
      identifieNode.right.parent = identifieNode;
    }
  }

  removeChild(node) {
    if (this.right && this.right === node) {
      this.right = null;
      return;
    } else if (this.left && this.left === node) {
      this.left = null;
      return;
    }
  }

  findNext() {
    if (!this.left) {
      return this;
    }

    return this.left.findNext();
  }
}

class Tree {
  constructor() {
    this.root = new Node(null);
  }
  add(value) {
    this.root.add(value);
  }

  remove(value) {
    this.root.remove(value);
  }

  find(value) {
    return this.root.find(value);
  }
}

const tree = new Tree();

tree.add(10);
tree.add(5);
tree.add(2);
tree.add(6);
tree.add(20);
tree.add(16);
tree.add(15);
tree.add(18);
tree.add(25);
tree.add(24);
tree.add(39);
tree.add(40);
tree.remove(20)

console.log(tree);
