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
}

/*const filesystem = new Tree('/');
filesystem.add('documents/personal/tax.docx');
filesystem.add('videos/good1.avi');
filesystem.add('videos/good2.avi');
filesystem.remove('videos/good1.avi');
console.log(filesystem);*/

