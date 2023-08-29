import Blockchain from './blockchain.js';

const myChain = new Blockchain();

myChain.createBlock(1, 'PrevHash', 'CurrentHash')
myChain.createBlock(2, 'PrevHash', 'CurrentHash')
myChain.createBlock(3, 'PrevHash', 'CurrentHash')
console.log(myChain)