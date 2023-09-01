import express, { Request, Response } from 'express';
import blockchain from './routes/blockchain-routes.js';

const app = express();

// kolla upp vart 10 kommer ifrån
const PORT: number = parseInt(process.argv[2]);

app.use(express.json());

app.use('/api/v1/blockchain', blockchain);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));