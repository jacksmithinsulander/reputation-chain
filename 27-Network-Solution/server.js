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
  // 1.   Vi måste hämta senaste blocket...
  const previousBlock = softCoin.getLastBlock();
  // 2.   Få tag i sendaste blockets hash...
  const previousHash = previousBlock.hash;
  // 3.   Skapa ett data objekt som innehåller
  // 3.1  data egenskap som ska innehålla allt i utestående lista(pendingList)...
  // 3.2  index egenskap som ger rätt index till nya blocket...
  const data = {
    data: softCoin.pendingList,
    index: previousBlock.index + 1,
  };
  // 4.   Skapa ett (nonce) värde, proofOfWork...
  const nonce = softCoin.proofOfWork(previousHash, data);
  // 5.   Skapa, räkna fram en hash för vårt nya block
  const hash = softCoin.createHash(previousHash, data, nonce);
  // 6. Belöna avsändare för skapande av ett nytt block...
  softCoin.addTransaction(6.25, '00', nodeAddress);
  // 7.   Anropa createBlock metoden i Blockchain...
  const block = softCoin.createBlock(nonce, previousHash, hash);
  // 8.   Returnera blocket till avsändaren
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
  if (softCoin.networkNodes.indexOf(url) === -1) {
    softCoin.networkNodes.push(url);
  }
  // Om inte registrera, dvs placera noden i vår networkNode lista...
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
