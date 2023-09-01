import express from 'express';
import blockchain from './routes/blockchain-routes.js';
import block from './routes/block-routes.js';
import consensus from './routes/consensus-routes.js';
import node from './routes/node-routes.js'
import query from './routes/query-routes.js'
import transaction from './routes/transaction-routes.js';
import transactions from './routes/transactions-routes.js';

const app = express();

const PORT: number = parseInt(process.argv[2]);

app.use(express.json());

app.use('/api/v1/blockchain', blockchain);
app.use('/api/v1/block', block);
app.use('/api/v1/transaction', transaction);
app.use('/api/v1/transactions', transactions);
app.use('/api/v1/node', node);
app.use('/api/v1/consensus', consensus);
app.use('/api/v1/query', query);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));