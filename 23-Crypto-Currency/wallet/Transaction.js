const { v4: uuidv4 } = require('uuid');
const { verifySignature } = require('../utilities');

class Transaction {
  constructor({ sender, recipient, amount }) {
    this.id = uuidv4();
    this.outputMap = this.createMap({ sender, recipient, amount });
    this.input = this.createInput({ sender, outputMap: this.outputMap });
  }

  createMap({ sender, recipient, amount }) {
    const map = {};

    map[recipient] = amount;
    map[sender.publicKey] = sender.balance - amount;

    // console.log(map);
    return map;
  }

  createInput({ sender, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: sender.balance,
      address: sender.publicKey,
      signature: sender.sign(outputMap),
    };
  }

  static validateTransaction(transaction) {
    const {
      input: { address, amount, signature },
      outputMap,
    } = transaction;

    const total = Object.values(outputMap).reduce(
      (total, amount) => total + amount
    );

    if (amount !== total) {
      return false;
    }

    if (!verifySignature({ publicKey: address, data: outputMap, signature })) {
      return false;
    }

    return true;
  }
}

module.exports = Transaction;
