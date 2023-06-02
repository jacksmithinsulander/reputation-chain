const Transaction = require('./Transaction');
const Wallet = require('./Wallet');
const { verifySignature } = require('../utilities');

describe('Transaction', () => {
  let sender, recipient, amount, transaction;

  beforeEach(() => {
    sender = new Wallet();
    recipient = 'recipient-key';
    amount = 100;

    transaction = new Transaction({ sender, recipient, amount });
  });

  it('should have an id', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('outputMap', () => {
    it('should have an outputMap property', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('should display the amount to the recipient', () => {
      expect(transaction.outputMap[recipient]).toEqual(amount);
    });

    it('should display the balance for the senders wallet', () => {
      expect(transaction.outputMap[sender.publicKey]).toEqual(
        sender.balance - amount
      );
    });
  });

  describe('input', () => {
    it('should av an input property', () => {
      expect(transaction).toHaveProperty('input');
    });

    it('should av a timestamp property', () => {
      expect(transaction.input).toHaveProperty('timestamp');
    });

    it('should set the amount to the senders balance', () => {
      expect(transaction.input.amount).toEqual(sender.balance);
    });

    it('should set the address to the senders public key', () => {
      expect(transaction.input.address).toEqual(sender.publicKey);
    });

    it('should sign the input', () => {
      expect(
        verifySignature({
          publicKey: sender.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        })
      ).toBe(true);
    });
  });
});
