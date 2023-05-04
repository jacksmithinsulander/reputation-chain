const Block = require('./Block');

class BlockChain {
  // #transactions = [];
  constructor() {
    // Dummy block som första block i kedjan...
    // Korrekta namnet är Genesis...
    const genisis = new Block(
      Date.now(),
      'GENESIS DATA',
      '#AW345',
      '#genesis-lasthash'
    );

    this.transactions = [genisis];
  }
  addBlock(data) {
    const lastHash =
      this.transactions[this.transactions.length - 1].currentHash;
    const hash = `${Date.now()}#ABC`;
    const block = new Block(data, hash, lastHash);
    block.timestamp = Date.now();
    this.transactions.push(block);
  }
}

module.exports = BlockChain;
