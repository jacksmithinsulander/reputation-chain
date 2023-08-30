import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import Blockchain, { Block, Transaction } from './blockchain.js';
import fetch from 'node-fetch';
import axios from 'axios';

const app = express();

const reputationChain = new Blockchain();

const PORT: number = parseInt(process.argv[2], 10);

const nodeAddress: string = uuidv4().split('-').join('');

app.use(express.json());

app.get('/api/blockchain', (req: Request, res: Response) => {
    res.status(200).json(reputationChain);
});

app.post('/api/transaction/broadcast', (req: Request, res: Response) => {
    const transaction: Transaction = reputationChain.addTransaction(
        req.body.amount, req.body.sender, req.body.recipient
    );
    reputationChain.addTransactionToPendingList(transaction);
    reputationChain.networkNodes.forEach(async(url) => {
        await axios.post(`${url}/api/transaction`, transaction);
    })
    res.status(201).json({success: true, data: 'Transaction finalized'});
});

app.post('/api/transaction', (req: Request, res: Response) => {
    const transaction: Transaction = req.body;
    const index: Block = reputationChain.
        addTransactionToPendingList(transaction);
    res.status(201).json({success: true, data: index})
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

    reputationChain.networkNodes.forEach(async(url) => {
        await axios.post(`${url}/api/block`, { block: block });
    });

    res.status(200).json({
        success: true,
        data: block
    });
});

app.post('/api/block', (req: Request, res: Response) => {
    const block: Block = req.body.block;
    const lastBlock: Block = reputationChain.getLastBlock();
    const hashIsCorrect: boolean = lastBlock.hash === block.previousHash;
    const hasCorrectIndex: boolean = lastBlock.index + 1 === block.index;

    if (hashIsCorrect && hasCorrectIndex)  {
        reputationChain.chain.push(block);
        reputationChain.pendingList = [];
        res.status(201).json({ success: true, data: block });
    } else {
        res.status(400).json(
            { 
                success: false, errorMessage: 'Declined block'
            }
        ); 
    };
});

app.post('/api/register-broadcast-node', async (req: Request, res: Response) => {
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

    res.status(201).json({success: true, data: 'New node added to network'})
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
        if (
            reputationChain.networkNodes.indexOf(url) === -1 &&
            reputationChain.nodeUrl !== url
        ) {
            reputationChain.networkNodes.push(url);
        }
    });  
    res.status(201).json({ success: true, data: 'Nya noder tillagda' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
