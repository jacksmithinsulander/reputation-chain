const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Broker = require('./redis/Broker');
const Blockchain = require('./blockchain/Blockchain');
const TransactionPool = require('./wallet/TransactionPool');
const Wallet = require('./wallet/Wallet');

const app = express();
const blockchain = new Blockchain();
const transactionPool = new TransactionPool();
const wallet = new Wallet();
const messageBroker = new Broker(blockchain, transactionPool);

const DEFAULT_PORT = 3000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// Sync at startup...
const syncData = async () => {
  try {
    const blockChainUrl = `${ROOT_ADDRESS}/api/1/blocks`;
    const transactionMapUrl = `${ROOT_ADDRESS}/api/1/transaction`;
    let result = await axios.get(blockChainUrl);

    blockchain.replaceChain(result.data);
    console.log('Synchronizing at startup');

    result = await axios.get(transactionMapUrl);
    const transactions = result.data;

    console.log('Synchronizing transactionpool at startup');
    transactionPool.replacePool(transactions);
  } catch (err) {
    console.log('Error', err);
  }
};

// MIDDLEWARE....
app.use(express.json());
app.use(cors());

// ENDPOINTS....
app.get('/api/1/blocks', (req, res) => {
  res.status(200).json(blockchain.chain);
});

app.post('/api/1/blocks', (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock({ data });
  messageBroker.broadcastBlockchain();

  res.status(201).json({ message: 'Added new block', block: block });
});

app.post('/api/1/transaction', (req, res) => {
  try {
    const { recipient, amount } = req.body;

    // Check if transaction exists in the pool...
    let transaction = transactionPool.transactionExists({
      address: wallet.publicKey,
    });

    if (transaction) {
      transaction.update({ sender: wallet, recipient, amount });
    } else {
      transaction = wallet.createTransaction({ amount, recipient });
    }

    transactionPool.addTransaction(transaction);

    messageBroker.broadcastTransaction(transaction);

    res.status(201).json({ status: 'Success', data: transactionPool });
  } catch (error) {
    res.status(400).json({ status: 'Error', message: error.message });
  }
});

app.get('/api/1/transaction', (req, res) => {
  res.status(200).json(transactionPool.transactionMap);
});

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === 'true') {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 100);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
  syncData();
});
