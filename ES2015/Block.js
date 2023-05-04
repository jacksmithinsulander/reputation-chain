// CommonJS module...
// E6 Class...
class Block {
  constructor(timestamp, data, hash, lastHash) {
    this.timestamp = timestamp;
    this.data = data;
    this.currentHash = hash;
    this.previousHash = lastHash;
  }
}

// Exponera modulens api...
module.exports = Block;
