const Blockchain = require('./blockchain');
const softCoin = new Blockchain();

const testChain = {
  chain: [
    {
      index: 1,
      timestamp: 1692644409356,
      data: [],
      nonce: 1,
      hash: 'Genisis',
      previousHash: 'Genisis',
    },
    {
      index: 2,
      timestamp: 1692644451683,
      data: [],
      nonce: 3984,
      hash: '00001d3ecd4ffb6ec47ecfb450d4628f7e77dff75149734aa69e0b9575c23032',
      previousHash: 'Genisis',
    },
    {
      index: 3,
      timestamp: 1692644511876,
      data: [
        {
          amount: 6.25,
          sender: '00',
          recipient: '13d1514d1a7b4cbaa38223053eba0e14',
          transactionId: '05dd7c1d5b2e45eea61d77b5315a1f5b',
        },
        {
          amount: 50,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '505309a229bd45548631e23da86515c7',
        },
      ],
      nonce: 6701,
      hash: '0000dfb9edf1aee4456d88ee5984ad362f854cb8be7c6176c13e8e33d08a3b85',
      previousHash: '00001d3ecd4ffb6ec47ecfb450d4628f7e77dff75149734aa69e0b9575c23032',
    },
    {
      index: 4,
      timestamp: 1692644561350,
      data: [
        {
          amount: 6.25,
          sender: '00',
          recipient: '13d1514d1a7b4cbaa38223053eba0e14',
          transactionId: 'ce232ccc7ec9443c911419fa9724acff',
        },
        {
          amount: 10,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: 'ee836da5d5a24a2e9988ddf6b54fb381',
        },
        {
          amount: 40,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '34075900d16b4b04898025b0b3edd17b',
        },
        {
          amount: 100,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: '709033f95b9c47b7bcfe94212fb1308a',
        },
        {
          amount: 300,
          sender: 'Emma',
          recipient: 'Michael',
          transactionId: 'a3f52cbbc24a495583dd2c6d6aeb0ba9',
        },
      ],
      nonce: 382,
      hash: '00001709296ce59dea9d16a4dd009d9a8294d5c6439f6b67b3241f27c49a227a',
      previousHash: '0000dfb9edf1aee4456d88ee5984ad362f854cb8be7c6176c13e8e33d08a3b85',
    },
    {
      index: 5,
      timestamp: 1692644575198,
      data: [
        {
          amount: 6.25,
          sender: '00',
          recipient: '13d1514d1a7b4cbaa38223053eba0e14',
          transactionId: '0928066708e94cceb776e31ff7307c86',
        },
      ],
      nonce: 110066,
      hash: '0000d3f078184f482807daa8958b60c5b8e0b08dbe77df8bf95eb46e8730c449',
      previousHash: '00001709296ce59dea9d16a4dd009d9a8294d5c6439f6b67b3241f27c49a227a',
    },
    {
      index: 6,
      timestamp: 1692644576610,
      data: [
        {
          amount: 6.25,
          sender: '00',
          recipient: '13d1514d1a7b4cbaa38223053eba0e14',
          transactionId: '2933f0565d1540bf9d89204b1ccf5c37',
        },
      ],
      nonce: 60587,
      hash: '0000572e5a193bc97fbea478357bb08e976399b86960d8ed514747ec12c1cfd4',
      previousHash: '0000d3f078184f482807daa8958b60c5b8e0b08dbe77df8bf95eb46e8730c449',
    },
  ],
  pendingList: [
    {
      amount: 6.25,
      sender: '00',
      recipient: '13d1514d1a7b4cbaa38223053eba0e14',
      transactionId: '7acf6be1b7f04199b86edf734b4a9a9c',
    },
  ],
  nodeUrl: 'http://localhost:3000',
  networkNodes: [],
};

console.log('Valid: ', softCoin.validateChain(testChain.chain));
