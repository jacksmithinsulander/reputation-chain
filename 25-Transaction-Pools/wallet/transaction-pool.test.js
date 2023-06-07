const TransactionPool = require('./TransactionPool');
const Transaction = require('./Transaction');
const Wallet = require('./Wallet');

describe('TransactionPool', () => {
  // Step 1.
  let transactionPool, transaction, sender;

  beforeEach(() => {
    transactionPool = new TransactionPool();
    sender = new Wallet();
    transaction = new Transaction({
      sender,
      recipient: 'test-recipient',
      amount: 100,
    });
  });

  describe('the addTransaction method', () => {
    it('should add a new transaction to the transactionpool', () => {
      transactionPool.addTransaction(transaction);

      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });

  describe('the transactionExists method', () => {
    it('should return an existing transaction based on the input address', () => {
      transactionPool.addTransaction(transaction);

      expect(
        transactionPool.transactionExists({ address: sender.publicKey })
      ).toBe(transaction);
    });
  });
});
