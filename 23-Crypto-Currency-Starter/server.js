const express = require('express');
const cors = require('cors');
const axios = require('axios');
const Broker = require('./redis/Broker');
const Blockchain = require('./blockchain/Blockchain');

const app = express();
const blockchain = new Blockchain();
const messageBroker = new Broker(blockchain);

const DEFAULT_PORT = 3000;
const ROOT_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

// Sync at startup...
const syncData = async () => {
  try {
    const url = `${ROOT_ADDRESS}/api/1/blocks`;
    const { data } = await axios.get(url);
    blockchain.replaceChain(data);
    console.log('Synchronizing at startup');
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
  messageBroker.broadcast();

  res.status(201).json({ message: 'Added new block', block: block });
  // ANVÄND INTE DETTA SÄTT!!!
  // res.redirect('/api/1/blocks');
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
