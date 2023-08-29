import Blockchain from './blockchain.js';

const myChain = new Blockchain();

myChain.createBlock(1, 'PrevHash', 'CurrentHash')
//myChain.createBlock(2, 'PrevHash', 'CurrentHash')
//myChain.createBlock(3, 'PrevHash', 'CurrentHash')

myChain.addTransaction(100, 'Jack', 'Michael');


console.log(myChain);
//console.log(myChain.getLastBlock());