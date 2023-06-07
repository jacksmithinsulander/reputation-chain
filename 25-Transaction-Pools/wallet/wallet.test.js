const Wallet = require('./Wallet');
const { verifySignature } = require('../utilities');
const Transaction = require('./Transaction');

describe('Wallet', () => {
  let wallet;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('should have a balance', () => {
    expect(wallet).toHaveProperty('balance');
  });

  it('should have a public key (publicKey)', () => {
    expect(wallet).toHaveProperty('publicKey');
  });

  describe('signing data', () => {
    const data = 'Avatar';

    it('should verify a valid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        })
      ).toBe(true);
    });

    it('should not verify an invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        })
      ).toBe(false);
    });
  });

  describe('create transactions', () => {
    describe('and the amount exceeds the funds', () => {
      it('throws an error', () => {
        expect(() =>
          wallet.createTransaction({ amount: 1000000, recipient: 'Felipe' })
        ).toThrow('Not enough funds');
      });
    });

    describe('and the amount is valid', () => {
      let transaction, amount, recipient;

      beforeEach(() => {
        amount = 100;
        recipient = 'Ellen';
        transaction = wallet.createTransaction({ amount, recipient });
      });

      it('creates a new instance of the class Transaction', () => {
        expect(transaction instanceof Transaction).toBe(true);
      });

      it('matches the input with the wallet', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it('displays the amount to the recipient', () => {
        expect(transaction.outputMap[recipient]).toEqual(amount);
      });
    });
  });
});
