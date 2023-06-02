const hexToBinary = require('hex-to-binary');
const Block = require('./Block');
const { GENESIS_DATA, MINE_RATE } = require('./config');
const crypto = require('./hash');

describe('Block', () => {
  // const timestamp = new Date().toString();
  const timestamp = Date.now();
  const lastHash = 'prev-hash';
  const hash = 'curr-hash';
  const data = ['Avatar', 'Ant-Man', 'Cocaine Bear'];
  const nonce = 1;
  const difficulty = 1;

  const block = new Block({
    timestamp,
    data,
    hash,
    lastHash,
    nonce,
    difficulty,
  });
  // const block = new Block({ timestamp, data, hash, lastHash });

  it('should set a timestamp', () => {
    // Använd .not för att negera en assertion...
    expect(block.timestamp).not.toEqual(undefined);
  });

  it('should set the data', () => {
    expect(block.data).toEqual(data);
  });

  it('should have a hash', () => {
    expect(block.hash).toEqual(hash);
  });

  it('should set the lasthash to the hash of the previous block', () => {
    expect(block.lastHash).toEqual(lastHash);
  });

  it('should have a nonce value', () => {
    expect(block.nonce).toEqual(nonce);
  });

  it('should have a difficulty value', () => {
    expect(block.difficulty).toEqual(difficulty);
  });

  it('should return an instance of Block', () => {
    expect(block instanceof Block).toBe(true);
  });

  describe('changeDifficultyLevel', () => {
    it('raises the difficulty level for a quickly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE - 100,
        })
      ).toEqual(block.difficulty + 1);
    });

    it('lowers the difficulty level for a slowly mined block', () => {
      expect(
        Block.adjustDifficultyLevel({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE + 100,
        })
      ).toEqual(block.difficulty - 1);
    });
  });
});

describe('genesis function', () => {
  const genesisBlock = Block.genesis();

  it('(should return an instance of Block)', () => {
    expect(genesisBlock instanceof Block).toBeTruthy();
  });

  it('should return the genesis data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});

describe('mineBlock function', () => {
  const lastBlock = Block.genesis();
  const data = 'New Data';
  const minedBlock = Block.mineBlock({ lastBlock, data });

  it('should return an instance of Block', () => {
    expect(minedBlock instanceof Block).toBeTruthy();
  });

  it('should set the lastHash to the hash of the previous block', () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash);
  });

  it('should set the data', () => {
    expect(minedBlock.data).toEqual(data);
  });

  it('should set a timestamp', () => {
    expect(minedBlock.timestamp).not.toEqual(undefined);
  });

  // Skapa en test som kontrollerar att ni får en hash baserat
  // på input värdena, timestamp, lastHash, data
  it('should create a hash based on input arguments', () => {
    expect(minedBlock.hash).toEqual(
      crypto(
        minedBlock.timestamp,
        minedBlock.nonce,
        minedBlock.difficulty,
        lastBlock.hash,
        data
      )
    );
  });

  it('creates a hash that matches difficulty level', () => {
    expect(
      hexToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
    ).toEqual('0'.repeat(minedBlock.difficulty));
  });

  it('adjust the difficultyLevel', () => {
    const difficultyResult = [
      lastBlock.difficulty + 1,
      lastBlock.difficulty - 1,
    ];

    expect(difficultyResult.includes(minedBlock.difficulty)).toBe(true);
  });
});
