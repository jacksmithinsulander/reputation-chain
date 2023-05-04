// CommonJS module...
// E6 Class...
class Block {
  // ES2022 fält deklaration...
  #timestamp = 'Dummy Value';
  #data = '';
  #hash = '#Y84345';
  #previousHash = '#Y84345';

  // constructor(timestamp, data, hash, lastHash) {
  //   this.#timestamp = timestamp;
  //   this.#data = data;
  //   this.#hash = hash;
  //   this.#previousHash = lastHash;
  // }
  constructor(data, hash, lastHash) {
    this.#data = data;
    this.#hash = hash;
    this.#previousHash = lastHash;
  }

  // Korrekt JavaScript
  // Data Hiding
  // Getters...
  get transaction() {
    return `${this.#data}-${new Date().getMilliseconds()}`;
  }

  get currentHash() {
    return this.#hash;
  }
  get previousHash() {
    return this.#previousHash;
  }

  get timestamp() {
    return this.#timestamp;
  }

  // Setter...
  set timestamp(value) {
    this.#timestamp = value;
  }
}

// Exponera modulens api...
module.exports = Block;

// function NewBlock(timestamp, data, hash, lastHash) {
//   this.timestamp = timestamp;
//   this.data = data;
//   this.hash = hash;
//   this.lastHash = lastHash;
// }

// const demoBlock = new Block(
//   Date.now(),
//   ['Nisse', 'Eva', 'Kalle'],
//   '#AAAGIBOS09',
//   '#6968REGKLFI'
// );

// console.log(demoBlock);

// const block2 = new NewBlock(
//   Date.now(),
//   ['Nisse', 'Eva', 'Kalle'],
//   '#AAAGIBOS09',
//   '#6968REGKLFI'
// );

// console.log(block2);
