const express = require('express');
const blockchain = require('./routes/blockchain-routes');
const block = require('./routes/block-routes');
const transaction = require('./routes/transaction-routes');
const transactions = require('./routes/transactions-routes');
const node = require('./routes/node-routes');
const consensus = require('./routes/consensus-routes');

const app = express();

const PORT = process.argv[2];

// Use middleware...
app.use(express.json());

// Use endpoint middleware...
app.use('/api/v1/blockchain', blockchain);
app.use('/api/v1/block', block);
app.use('/api/v1/transaction', transaction);
app.use('/api/v1/transactions', transactions);
app.use('/api/v1/node', node);
app.use('/api/v1/consensus', consensus);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
