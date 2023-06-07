const Blockchain = require('../blockchain/Blockchain');
const blockchain = new Blockchain();

const times = [];
let prevTime, nextTime, nextBlock, timeDiff, average;

for (let i = 0; i < 10000; i++) {
  prevTime = blockchain.chain.at(-1).timestamp;

  blockchain.addBlock({ data: `Block: ${i}` });

  nextBlock = blockchain.chain.at(-1);

  nextTime = nextBlock.timestamp;
  timeDiff = nextTime - prevTime;
  times.push(timeDiff);

  average = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time it took to mine a block: ${timeDiff}ms, difficulty level: ${nextBlock.difficulty}, average time: ${average}ms`
  );
}
