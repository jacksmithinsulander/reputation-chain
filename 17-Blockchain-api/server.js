const express = require('express');
const cors = require('cors');
const Blockchain = require('./Blockchain');

const app = express();
const blockchain = new Blockchain();

app.use(express.json());
// Detta är snik varianten
// Som tillåter alla att kommunicera med mina endpoints...
app.use(cors());

app.get('/api/1/blocks', (req, res) => {
  res.status(200).json(blockchain.chain);
});

app.post('/api/1/blocks', (req, res) => {
  const { data } = req.body;
  const block = blockchain.addBlock({ data });

  res.status(201).json({ message: 'Added new block', block: block });
  // ANVÄND INTE DETTA SÄTT!!!
  // res.redirect('/api/1/blocks');
});

const PORT = 5001;

app.listen(PORT, () =>
  console.log(`Server is up and running on port: ${PORT}`)
);
