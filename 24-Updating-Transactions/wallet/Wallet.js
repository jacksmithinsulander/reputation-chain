const { INITIAL_BALANCE } = require('../utilities/config');
const { ec } = require('../utilities');
const crypto = require('../utilities/hash');
const Transaction = require('./Transaction');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(crypto(data));
  }

  createTransaction({ amount, recipient }) {
    if (amount > this.balance) {
      throw new Error('Not enough funds');
    }

    return new Transaction({ sender: this, recipient, amount });
  }
}

module.exports = Wallet;
