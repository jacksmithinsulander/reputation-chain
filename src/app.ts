import Blockchain from './blockchain.js';

const myChain = new Blockchain();

myChain.createBlock(1, 'PrevHash', 'CurrentHash')

console.log(myChain)