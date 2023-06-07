const redis = require('redis');

const channels = {
  test: 'movies',
  blockchain: 'blockchain',
  transaction: 'transaction',
};

class Broker {
  constructor(blockchain, transactionPool) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case channels.blockchain:
        this.blockchain.replaceChain(parsedMessage);
        break;
      case channels.transaction:
        this.transactionPool.addTransaction(parsedMessage);
        break;
      default:
        return;
    }
  }

  subscribeToChannels() {
    Object.values(channels).forEach((channel) => {
      this.subscriber.subscribe(channel);
    });
  }

  publish(channel, message) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastBlockchain() {
    this.publish(channels.blockchain, JSON.stringify(this.blockchain.chain));
  }

  broadcastTransaction(transaction) {
    this.publish(channels.transaction, JSON.stringify(transaction));
  }
}

module.exports = Broker;
