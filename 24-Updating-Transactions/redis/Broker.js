const redis = require('redis');

const channels = {
  test: 'movies',
  blockchain: 'blockchain',
};

class Broker {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscribeToChannels();

    this.subscriber.on('message', (channel, message) =>
      this.handleMessage(channel, message)
    );
  }

  handleMessage(channel, message) {
    const blockchain = JSON.parse(message);

    if (channel === channels.blockchain) {
      // Replace existing blockchain...
      this.blockchain.replaceChain(blockchain);
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

  broadcast() {
    this.publish(channels.blockchain, JSON.stringify(this.blockchain.chain));
  }
}

module.exports = Broker;
