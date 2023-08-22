const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const axios = require('axios');
const Blockchain = require('./blockchain');
const app = express();

const softCoin = new Blockchain();

const PORT = process.argv[2];
const nodeAddress = uuidv4().split('-').join('');

// Middleware...
app.use(express.json());

app.get('/api/blockchain', (req, res) => {
  res.status(200).json({ success: true, data: softCoin });
});

app.post('/api/transaction', (req, res) => {
  // const index = softCoin.addTransaction(req.body.amount, req.body.sender, req.body.recipient);
  // res.status(201).json({ success: true, data: `Block index: ${index}` });
  const transaction = req.body;
  const index = softCoin.addTransactionToPendingList(transaction);

  res.status(201).json({ success: true, data: index });
});

app.post('/api/transaction/broadcast', (req, res) => {
  const transaction = softCoin.addTransaction(req.body.amount, req.body.sender, req.body.recipient);
  softCoin.addTransactionToPendingList(transaction);

  softCoin.networkNodes.forEach(async (url) => {
    await axios.post(`${url}/api/transaction`, transaction);
  });

  res.status(201).json({ success: true, data: 'Transaktioner är skapade och uppdaterade.' });
});

app.get('/api/mine', async (req, res) => {
  const previousBlock = softCoin.getLastBlock();
  const previousHash = previousBlock.hash;
  const data = {
    data: softCoin.pendingList,
    index: previousBlock.index + 1,
  };
  const nonce = softCoin.proofOfWork(previousHash, data);
  const hash = softCoin.createHash(previousHash, data, nonce);

  // softCoin.addTransaction(6.25, '00', nodeAddress);

  const block = softCoin.createBlock(nonce, previousHash, hash);

  softCoin.networkNodes.forEach(async (url) => {
    await axios.post(`${url}/api/block`, { block: block });
  });

  await axios.post(`${softCoin.nodeUrl}/api/transaction/broadcast`, { amount: 6.25, sender: '00', recipient: nodeAddress });

  res.status(200).json({
    success: true,
    data: block,
  });
});

app.post('/api/block', (req, res) => {
  const block = req.body.block;
  const lastBlock = softCoin.getLastBlock();
  const hashIsCorrect = lastBlock.hash === block.previousHash;
  const hasCorrectIndex = lastBlock.index + 1 === block.index;

  if (hashIsCorrect && hasCorrectIndex) {
    softCoin.chain.push(block);
    softCoin.pendingList = [];
    res.status(201).json({ success: true, errorMessage: 'Blocket är inte godkänt', data: block });
  } else {
    res.status(400).json({ success: false, data: 'Block är inte godkänt' });
  }
});

// Administrativa endpoints...
// Registrera och synkronisera ny nod med alla noder...
app.post('/api/register-broadcast-node', async (req, res) => {
  const urlToAdd = req.body.nodeUrl;

  if (softCoin.networkNodes.indexOf(urlToAdd) === -1) {
    softCoin.networkNodes.push(urlToAdd);
  }

  softCoin.networkNodes.forEach(async (url) => {
    const body = { nodeUrl: urlToAdd };

    await fetch(`${url}/api/register-node`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
  });

  const body = { nodes: [...softCoin.networkNodes, softCoin.nodeUrl] };

  await fetch(`${urlToAdd}/api/register-nodes`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  res.status(201).json({ success: true, data: 'Ny nod tillagd' });
});

// Registrera enskild node
app.post('/api/register-node', (req, res) => {
  const url = req.body.nodeUrl;
  console.log('register-node', url);

  if (softCoin.networkNodes.indexOf(url) === -1 && softCoin.nodeUrl !== url) {
    softCoin.networkNodes.push(url);
  }

  res.status(201).json({ success: true, data: 'Ny nod tillagd' });
});

app.post('/api/register-nodes', (req, res) => {
  const allNodes = req.body.nodes;

  allNodes.forEach((url) => {
    if (softCoin.networkNodes.indexOf(url) === -1 && softCoin.nodeUrl !== url) {
      softCoin.networkNodes.push(url);
    }
  });

  res.status(201).json({ success: true, data: 'Nya noder tillagda' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
