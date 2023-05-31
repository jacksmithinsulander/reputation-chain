const crypto = require('./hash');
const { GENESIS_DATA, MINE_RATE } = require('./config');

class Block {
  constructor({ timestamp, data, hash, lastHash, nonce, difficulty }) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    // return new Block(GENESIS_DATA);
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let timestamp, hash;
    // let timestamp = Date.now();
    // let hash;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficultyLevel({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = crypto(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({ timestamp, lastHash, data, difficulty, nonce, hash });
  }

  static adjustDifficultyLevel({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;

    if (timestamp - originalBlock.timestamp > MINE_RATE) return difficulty - 1;

    return difficulty + 1;
  }
}

module.exports = Block;
