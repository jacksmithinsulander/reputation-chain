const sha256 = require('sha256');
const { v4: uuidv4 } = require('uuid');

// Class...
// Constructor function...
function Blockchain() {
  this.chain = [];
  this.pendingList = [];
  this.nodeUrl = process.argv[3];
  this.networkNodes = [];

  // Skapa genesis blocket...
  this.createBlock(1, 'Genisis', 'Genisis');
}

// Skapa ett block
Blockchain.prototype.createBlock = function (nonce, previousHash, hash) {
  const block = {
    index: this.chain.length + 1,
    timestamp: Date.now(),
    data: this.pendingList,
    nonce: nonce,
    hash: hash,
    previousHash: previousHash,
  };

  this.pendingList = [];
  this.chain.push(block);

  return block;
};

// Hämta senaste blocket...
Blockchain.prototype.getLastBlock = function () {
  return this.chain.at(-1);
};

// Funktion för att lägga till data i pendingList...
Blockchain.prototype.addTransaction = function (amount, sender, recipient) {
  const transaction = {
    amount,
    sender,
    recipient,
    transactionId: uuidv4().split('-').join(''),
  };

  return transaction;
  // this.pendingList.push(data);

  // return this.getLastBlock()['index'] + 1;
};

Blockchain.prototype.addTransactionToPendingList = function (transaction) {
  this.pendingList.push(transaction);
  return this.getLastBlock().index + 1;
};

// Skapa ett hash värde...
Blockchain.prototype.createHash = function (prevHash, data, nonce) {
  const stringToHash = prevHash + JSON.stringify(data) + nonce.toString();
  const hash = sha256(stringToHash);
  return hash;
};

Blockchain.prototype.proofOfWork = function (prevHash, data) {
  let nonce = 0;
  let hash = this.createHash(prevHash, data, nonce);

  while (hash.substring(0, 4) !== '0000') {
    nonce++;
    hash = this.createHash(prevHash, data, nonce);
  }

  return nonce;
};

Blockchain.prototype.validateChain = function (blockChain) {
  let isValid = true;

  for (i = 1; i < blockChain.length; i++) {
    const block = blockChain[i];
    const previousBlock = blockChain[i - 1];
    const hash = this.createHash(previousBlock.hash, { data: block.data, index: block.index }, block.nonce);

    if (hash !== block.hash) {
      isValid = false;
    }

    if (block.previousHash !== previousBlock.hash) {
      isValid = false;
    }
  }

  // Validera genisis blocket...
  const genesisBlock = blockChain.at(0);
  const isGenesisNonceValid = genesisBlock.nonce === 1;
  const isGenesisHashValid = genesisBlock.hash === 'Genisis';
  const isGenesisPreviousHashValid = genesisBlock.previousHash === 'Genisis';
  const hasNoData = genesisBlock.data.length === 0;

  if (!isGenesisNonceValid || !isGenesisHashValid || !isGenesisPreviousHashValid || !hasNoData) {
    isValid = false;
  }

  return isValid;
};

Blockchain.prototype.findBlock = function (blockHash) {
  return this.chain.find((block) => block.hash === blockHash);
};

Blockchain.prototype.findTransaction = function (transactionId) {
  const block = this.chain.find((block) => block.data.find((transaction) => transaction.transactionId === transactionId));

  if (!block) {
    return null;
  } else {
    const transaction = block.data.find((transaction) => transaction.transactionId === transactionId);
    return { transaction, block };
  }
};

Blockchain.prototype.listTransactions = function (address) {
  let balance = 0;
  const transactions = [];

  // 1. Hitta alla transaction på både sender och recipient...
  this.chain.forEach((block) => {
    block.data.forEach((transaction) => {
      if (transaction.sender === address || transaction.recipient === address) {
        transactions.push(transaction);
      }
    });
  });

  // 2. Beräkna balansen på mitt konto...
  transactions.forEach((transaction) => {
    if (transaction.recipient === address) {
      balance += transaction.amount;
    } else if (transaction.sender === address) {
      balance -= transaction.amount;
    }
  });

  return { balance, transactions };
};

module.exports = Blockchain;
