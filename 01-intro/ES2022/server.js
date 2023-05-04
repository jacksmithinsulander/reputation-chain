const BlockChain = require('./BlockChain');

const chain = new BlockChain();

chain.addBlock('Betala');
// chain.addBlock(['Volvo', 'Polestar']);
// chain.addBlock({ id: 1, amount: 100 });

console.log(chain);
