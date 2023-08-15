const Blockchain = require('./blockchain');

const myChain = new Blockchain();

const prevHash = 'PreviousHash';
const data = [
  {
    amount: 100,
    sender: 'Michael',
    recipient: 'Malin',
  },
  {
    amount: 50,
    sender: 'Malin',
    recipient: 'Michael',
  },
  {
    amount: 200,
    sender: 'Michael',
    recipient: 'Emma',
  },
];

console.log(myChain);
const lastBlock = myChain.getLastBlock();
console.log(lastBlock);
console.log(lastBlock.previousHash);

const newBlock = myChain.createBlock(1, lastBlock.previousHash, 'test');

console.log(newBlock);
console.log(myChain);
// const nonce = myChain.proofOfWork(prevHash, data);
// console.log(nonce);
// const hash = myChain.createHash(prevHash, data, nonce);
// console.log(hash);

// const nonce = 100;

// const hash = myChain.createHash(prevHash, data, nonce);
// console.log(hash);

// myChain.createBlock(1, 'PrevHash', 'CurrentHash');

// myChain.addData(100, 'Michael', 'Malin');

// console.log(myChain);

// myChain.createBlock(2, 'PrevHash', 'CurrentHash');

// console.log(myChain);
// console.log(myChain.chain.at(1));

// myChain.addTransaction(100, 'Michael', 'Malin');
// myChain.addTransaction(50, 'Malin', 'Michael');
// myChain.addTransaction(200, 'Michael', 'Emma');
// myChain.addTransaction(300, 'Michael', 'Annika');
// const response = myChain.addTransaction(400, 'Michael', 'Malin');

// // console.log(response);
// myChain.createBlock(3, 'PrevHash', 'CurrentHash');

// console.log(myChain);
// console.log(myChain.chain.at(1));
// console.log(myChain.chain.at(2));
// console.log(myChain.getLastBlock());
