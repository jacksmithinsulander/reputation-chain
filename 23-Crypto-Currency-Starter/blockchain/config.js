const MINE_RATE = 1000;
const INITIAL_DIFFICULTY = 3;
const GENESIS_DATA = {
  timestamp: 1,
  data: [],
  hash: '#1',
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
  lastHash: '######',
};

module.exports = { GENESIS_DATA, MINE_RATE };
