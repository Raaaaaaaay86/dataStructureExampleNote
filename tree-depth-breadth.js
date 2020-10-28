class Node {
  constructor(value, parentNode = null) {
    this.children = [];
    this.parent = parentNode;
    this.value = value;
  }
  addNode(value) {
    const segments = value.split('/');

    if (segments.length === 0) {
      return;
    }
    if (segments.length === 1) {
      const node = new Node(segments[0], this);
      this.children.push(node);
      return {node, index: this.children.length - 1};
    }
    const existingChildNode = this.children.find((child) => child.value === segments[0] );
    if (existingChildNode) {
      existingChildNode.addNode(segments.slice(1).join('/'));
    } else {
      const node = new Node(segments[0], this);
      this.children.push(node);
      node.addNode(segments.slice(1).join('/'));
      return {node, index: this.children.length - 1};
    }
  }
  removeNode(value) {
    const segments = value.split('/');
    if (segments.length === 0) {
      return;
    } else if (segments.length === 1) {
      const existingNodeIndex = this.children.findIndex((child) => child.value === segments[0]);
      if (existingNodeIndex < 0) {
        throw new Error('Could not find mactching value!');
      }
      this.children.splice(existingNodeIndex, 1);
    } else if (segments.length > 1) {
      const existingChildNode = this.children.find((child) => child.value === segments[0]);
      if (!existingChildNode) {
        throw new Error(`Could not find matching path! Path segment: ${segments[0]}`);
      }
      existingChildNode.removeNode(segments.slice(1).join('/'));
    }
  }
  find(value) {
    // Depth First
    console.log(this)
    // for (const child of this.children) {
    //   if (child.value === value) {
    //     return child;
    //   }
    //   const nestedChildNode = child.find(value);
    //   if (nestedChildNode) {
    //     return nestedChildNode;
    //   }
    // }
    // Breadth First
    for (const child of this.children) {
      if (child.value === value) {
        return child;
      }
    }
    for (const child of this.children) {
      const nestedChildNode = child.find(value);
      if (nestedChildNode) {
        return nestedChildNode;
      }
    }
  }
}

class Tree {
  constructor(rooValue) {
    this.root = new Node(rooValue);
  }
  add(path) {
    this.root.addNode(path);
  }
  remove(path) {
    this.root.removeNode(path);
  }
  find(value) {
    if (this.root.value === value) {
      return this.root.value;
    }
    return this.root.find(value);
  }
}

const filesystem = new Tree('/');
filesystem.add('documents/myData/personal/tax.docx');
filesystem.add('documents/myData/public/tax.docx');
filesystem.add('games/cod.exe');
filesystem.add('games/cod2.exe');
filesystem.remove('games/cod.exe');
console.log(filesystem.find('games'));
console.log(filesystem);

