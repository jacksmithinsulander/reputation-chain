const { INITIAL_BALANCE } = require('../utilities/config');
const { ec } = require('../utilities');
const crypto = require('../utilities/hash');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ec.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(crypto(data));
  }
}

module.exports = Wallet;
