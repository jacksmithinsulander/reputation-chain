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

  describe('validate the transaction', () => {
    describe('when the transaction is valid', () => {
      it('should return true', () => {
        expect(Transaction.validateTransaction(transaction)).toBe(true);
      });
    });

    describe('when the transaction is invalid', () => {
      describe('and a transactions outputMap is invalid', () => {
        it('should return false', () => {
          transaction.outputMap[sender.publicKey] = 111111111;
          expect(Transaction.validateTransaction(transaction)).toBe(false);
        });
      });

      describe('and a transaction input signature is invalid', () => {
        it('should returns false', () => {
          transaction.input.signature = new Wallet().sign('Good try!!!');
          expect(Transaction.validateTransaction(transaction)).toBe(false);
        });
      });
    });
  });

  describe('update transaction', () => {
    let originalSignature, originalSenderOutput, nextRecipient, nextAmount;

    describe('and the amount is invalid', () => {
      it('should throw an exception', () => {
        expect(() => {
          transaction.update({ sender, recipient: 'Nisse', amount: 1000 });
        }).toThrow('Not enough funds');
      });
    });

    describe('and the amount is valid', () => {
      beforeEach(() => {
        originalSignature = transaction.input.signature;
        originalSenderOutput = transaction.outputMap[sender.publicKey];
        (nextRecipient = 'kalle'), (nextAmount = 100);

        transaction.update({
          sender,
          recipient: nextRecipient,
          amount: nextAmount,
        });
      });

      // Display the amount sent to the next recipient
      it('should display the amount to next recipient', () => {
        expect(transaction.outputMap[nextRecipient]).toEqual(nextAmount);
      });

      // Update the balance for the sender...
      it('should recalculate the balance for the sender', () => {
        expect(transaction.outputMap[sender.publicKey]).toEqual(
          originalSenderOutput - nextAmount
        );
      });

      // Output must match the input value...
      it('should match the output value with the input value', () => {
        expect(
          Object.values(transaction.outputMap).reduce(
            (total, amount) => total + amount
          )
        ).toEqual(transaction.input.amount);
      });

      // Security, the signature must not be the same as the original signature...
      it('should synchronize the transaction', () => {
        expect(transaction.input.signature).not.toEqual(originalSignature);
      });

      describe('and doing an update for the recipient', () => {
        let newAmount;

        beforeEach(() => {
          newAmount = 75;
          transaction.update({
            sender,
            recipient: nextRecipient,
            amount: newAmount,
          });
        });

        it('should accumulate the recipients amount', () => {
          expect(transaction.outputMap[nextRecipient]).toEqual(
            nextAmount + newAmount
          );
        });

        it('should update the balance for the sender', () => {
          expect(transaction.outputMap[sender.publicKey]).toEqual(
            originalSenderOutput - nextAmount - newAmount
          );
        });
      });
    });
  });
});
