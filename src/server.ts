import express, { Request, Response } from 'express';
import Blockchain from './blockchain.js';
const app = express();

const reputationChain = new Blockchain();

app.get('/api/blockchain', (req: Request, res: Response) => {
    res.status(200).json(reputationChain);
});

app.post('/api/transaction', (req: Request, res: Response) => {});

app.get('/api/mine', (req: Request, res: Response) => {})

app.listen(3000, () => console.log("Server is running on port 3000"));

