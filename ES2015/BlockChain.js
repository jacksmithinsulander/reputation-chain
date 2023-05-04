const Block = require('./Block');

class BlockChain {
  constructor() {
    // Dummy block som första block i kedjan...
    // Korrekta namnet är Genesis...
    const date = Date.now();
    const genisis = new Block(
      date,
      'GENESIS DATA',
      '#AW345',
      '#genesis-lasthash'
    );

    this.transactions = [genisis];
    this.hashCounter = 1;
  }
  addBlock(data) {
    // const lastHash =
    //   this.transactions[this.transactions.length - 1].currentHash;
    const lastHash = this.transactions.at(-1).currentHash;
    const hash = `${Date.now()}${this.hashCounter++}`;
    const date = Date.now();
    // const block = new Block({ timestamp: date, data, hash, lastHash });
    const block = new Block(date, data, hash, lastHash);
    block.timestamp = Date.now();
    this.transactions.push(block);
  }
}

module.exports = BlockChain;
