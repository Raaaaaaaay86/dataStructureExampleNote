class HashTable {
  constructor(){
    this.size = 16;
    this.buckets = Array(16).fill(null).map(() => []);
  }

  hash(key) {
    let hash = 0;
    for (const char of key) {
      hash += char.charCodeAt(0);
    }
    return hash % this.size;
  }

  set(key, value) {
    const keyHash = this.hash(key);
    const bucketArray = this.buckets[keyHash];
    const storeElement = bucketArray.find((element) => {
      return element.key === key;
    });

    if (storeElement) {
      storeElement.value = value;
    } else {
      bucketArray.push({key, value});
    }
  }

  get(key) {
    const keyHash = this.hash(key);
    const bucketArray = this.buckets[keyHash];
    const storedElement = bucketArray.find((element) => {
      return element.key === key;
    })
    return storedElement;
  }

  showInfo() {
    for (const key in this.buckets) {
      if (this.buckets[key] !== null) {
        console.log(key, this.buckets[key]);
      }
    }
  }
}

const findFirstRep = (str) => {
  const table = new HashTable();
  for (const char of str) {
    if (table.get(char)) {
      return char;
    }
    table.set(char, 1);
  }
};

const table1 = new HashTable();
for (const char of 'academind') {
  table1.set(char, char);
}
for (const char of 'hello') {
  table1.set(char, char);
}
for (const char of 'does this work') {
  table1.set(char, char);
}
table1.showInfo();
