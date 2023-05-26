const redis = require('redis');

class Broker {
  constructor(movies) {
    this.movies = movies;
    // Create the publisher...
    this.publisher = redis.createClient();
    // Create the subscriber...
    this.subscriber = redis.createClient();

    // Sätt upp prenumeranten att lyssan på kanalen 'movies'
    this.subscriber.subscribe('movies');

    this.subscriber.on('message', (channel, message) => {
      console.log(`Got the message: ${message} on channel: ${channel}`);
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
    // console.log('Is broadcasting');
    this.publish('movies', JSON.stringify(this.movies));
  }
}

module.exports = Broker;
