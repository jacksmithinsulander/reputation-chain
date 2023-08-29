import Blockchain from './blockchain.js';

const myChain = new Blockchain();

myChain.createBlock(1, 'PrevHash', 'CurrentHash');
//myChain.createBlock(2, 'PrevHash', 'CurrentHash')
//myChain.createBlock(3, 'PrevHash', 'CurrentHash')

myChain.addTransaction(100, 'Jack', 'Michael');

myChain.createBlock(2, 'PrevHash', 'CurrentHash');

myChain.addTransaction(100, 'Jack', 'Michael');
myChain.addTransaction(143, 'Stefan', 'Björn');
myChain.addTransaction(92, 'Björn', 'Michael');
myChain.addTransaction(14, 'Jack', 'Björn');
myChain.addTransaction(111, 'Michael', 'Stefan');

myChain.createBlock(3, 'PrevHash', 'CurrentHash');

console.log(myChain);
console.log(myChain.chain.at(1));
console.log(myChain.chain.at(2));
//console.log(myChain.getLastBlock());