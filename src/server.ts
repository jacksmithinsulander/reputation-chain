import express, { Request, Response } from 'express';
import Blockchain, { Block, Transaction} from './blockchain.js';

const app = express();

const reputationChain = new Blockchain();

app.get('/api/blockchain', (req: Request, res: Response) => {
    res.status(200).json(reputationChain);
});

app.post('/api/transaction', (req: Request, res: Response) => {
    const index: Block = reputationChain.addTransaction(
        req.body.amount, 
        req.body.sender,
        req.body.recipient
    );
    res.status(201).json({success: true, data: `Block Index: $${index}`});
});

app.get('/api/mine', (req: Request, res: Response) => {})

app.listen(3000, () => console.log("Server is running on port 3000"));

