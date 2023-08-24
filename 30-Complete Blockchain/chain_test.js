const Blockchain = require('./blockchain');
const softCoin = new Blockchain();

const testChain = {
  chain: [
    {
      index: 1,
      timestamp: 1692695854380,
      data: [],
      nonce: 1,
      hash: 'Genisis',
      previousHash: 'Genisis',
    },
    {
      index: 2,
      timestamp: 1692695939579,
      data: [],
      nonce: 3984,
      hash: '00001d3ecd4ffb6ec47ecfb450d4628f7e77dff75149734aa69e0b9575c23032',
      previousHash: 'Genisis',
    },
    {
      index: 3,
      timestamp: 1692695997765,
      data: [
        {
          amount: 6.25,
          sender: '00',
          recipient: '45a4fcbfea3e4d8794524266e98c7233',
          transactionId: '9ebaed1d4c934d73834e1aacdc61bb12',
        },
        {
          amount: 300,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: 'fbe9587e1d9c4383b43c0c47c06e539b',
        },
        {
          amount: 100,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '952cb36286024ef29458f20ffa5bb896',
        },
        {
          amount: 500,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '48c8c50f5ec44a8a9a407b4907dc7e2b',
        },
        {
          amount: 50,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '002ce22c837e46b5a443e6795dd04e05',
        },
        {
          amount: 10,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: 'f3fdacadf4804e7ab6ef1f70bbbd475e',
        },
      ],
      nonce: 44543,
      hash: '0000d16bc4af60cf5a1e66882a31223c9c66d811391f8ca13a5bd063ecc60607',
      previousHash: '00001d3ecd4ffb6ec47ecfb450d4628f7e77dff75149734aa69e0b9575c23032',
    },
  ],
  pendingList: [
    {
      amount: 6.25,
      sender: '00',
      recipient: '45a4fcbfea3e4d8794524266e98c7233',
      transactionId: 'd627f7e2fc074a17974c667c3956418c',
    },
  ],
  nodeUrl: 'http://localhost:3000',
  networkNodes: ['http://localhost:3001'],
};

console.log('Är korrekt: ', softCoin.validateChain(testChain.chain));
