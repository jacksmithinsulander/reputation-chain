const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Blockchain = require('./blockchain');
const app = express();

const softCoin = new Blockchain();

const PORT = process.argv[2];
const nodeAddress = uuidv4().split('-').join('');

// Middleware...
app.use(express.json());

app.get('/api/blockchain', (req, res) => {
  res.status(200).json(softCoin);
});

app.post('/api/transaction', (req, res) => {
  const index = softCoin.addTransaction(req.body.amount, req.body.sender, req.body.recipient);
  res.status(201).json({ success: true, data: `Block index: ${index}` });
});

app.get('/api/mine', (req, res) => {
  const previousBlock = softCoin.getLastBlock();
  const previousHash = previousBlock.hash;
  const data = {
    data: softCoin.pendingList,
    index: previousBlock.index + 1,
  };
  const nonce = softCoin.proofOfWork(previousHash, data);
  const hash = softCoin.createHash(previousHash, data, nonce);

  softCoin.addTransaction(6.25, '00', nodeAddress);

  const block = softCoin.createBlock(nonce, previousHash, hash);

  res.status(200).json({
    success: true,
    data: block,
  });
});

// Administrativa endpoints...
// Registrera enskild node
app.post('/api/register-node', (req, res) => {
  // Få in en nodes unika adress(URL)...
  const url = req.body.nodeUrl; //http://localhost:3001
  // Kontrollera att vi inte redan har registrerat denna URL...
  // Om inte registrera, dvs placera noden i vår networkNode lista...
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
