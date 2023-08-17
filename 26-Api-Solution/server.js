const express = require('express');
const Blockchain = require('./blockchain');
const app = express();

const softCoin = new Blockchain();

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
  // 2.   Få tag i sendaste blockets hash...
  // 3.   Skapa ett data objekt som innehåller
  // 3.1  data egenskap som ska innehålla allt i utestående lista(pendingList)...
  // 3.2  index egenskap som ger rätt index till nya blocket...
  // 4.   Skapa ett (nonce) värde
  // 5.   Skapa, räkna fram en hash för vårt nya block
  // 6.   Anropa createBlock metoden i Blockchain...
  // 7.   Returnera blocket till avsändaren
  // res.send(???);
});

app.listen(3000, () => console.log('Server is running on port 3000'));
