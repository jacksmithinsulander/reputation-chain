import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Blockchain, { Block, Transaction } from './blockchain.js';
import fetch from 'node-fetch';

const app = express();

const reputationChain = new Blockchain();

const PORT: string = process.argv[2];

const nodeAddress: string = uuidv4().split('-').join('');

app.use(express.json());

app.get('/api/blockchain', (req: Request, res: Response) => {
    res.status(200).json(reputationChain);
});

app.post('/api/transaction', (req: Request, res: Response) => {
    const index: Block = reputationChain.addTransaction(
        req.body.amount,
        req.body.sender,
        req.body.recipient
    );
    res.status(201).json({ success: true, data: `Block Index: ${index}` });
});

app.get('/api/mine', (req: Request, res: Response) => {
    const previousBlock: Block = reputationChain.getLastBlock();
    const previousHash: string = previousBlock.hash;
    type data = {
        data: Transaction,
        index: number
    }
    const data = {
        data: reputationChain.pendingList,
        index: previousBlock.index + 1
    }
    const nonce: number = reputationChain.proofOfWork(previousHash, data);
    const hash: string = reputationChain.createHash(previousHash, data, nonce);

    reputationChain.addTransaction(4.20, '00', nodeAddress);

    const block: Block = reputationChain.createBlock(nonce, previousHash, hash);

    res.status(200).json({
        success: true,
        data: block
    });
});

app.pos('/api/register-broadcast-node', async (req: Request, res: Response) => {
    const urlToAdd: string[] = req.body.nodeUrl;

    if (reputationChain.networkNodes.indexOf(urlToAdd) === -1) {
        reputationChain.networkNodes.push(urlToAdd);
    };

    reputationChain.networkNodes.forEach(async(url) => {
        const body = { nodeUrl: urlToAdd };
        await fetch(`${url}/api/register-node`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
    });

    const body = {
        nodes: [
            ...reputationChain.networkNodes, reputationChain.nodeUrl
        ]
    };

    await fetch(`${urlToAdd}/api/register-nodes`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-type': 'application/json'}
    })

    res.statos(201).json({success: true, data: 'New node added to network'})
});

app.post('/api/register-node', (req: Request, res: Response) => {
    const url: string[] = req.body.nodeUrl;

    if (
        reputationChain.networkNodes.indexOf(url) === -1 && 
        reputationChain.nodeUrl !== url
    ) {
        reputationChain.networkNodes.push(url);
    };
    
    res.status(201).json({ success: true, data: 'New nodes added' });
});


app.post('/api/register-nodes', (req: Request, res: Response) => {
    const allNodes: string[] = req.body.nodes;
  
    allNodes.forEach((url) => {
      if (reputationChain.networkNodes.indexOf(url) === -1 && reputationChain.nodeUrl !== url) {
        reputationChain.networkNodes.push(url);
      }
    });
  
    res.status(201).json({ success: true, data: 'Nya noder tillagda' });
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

