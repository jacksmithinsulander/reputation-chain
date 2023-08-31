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

app.get('/api/mine', async (req: Request, res: Response) => {
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

    const block: Block = reputationChain.
        createBlock(nonce, previousHash, hash);

    reputationChain.networkNodes.forEach(async(url: string) => {
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

    reputationChain.networkNodes.forEach(async(url: string) => {
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

app.get('/api/consensus', (req: Request, res: Response) => {
    const currentChainLength: number = reputationChain.chain.length;
    let maxLength: number = currentChainLength;
    let longestChain = null;
    let pendingList: Transaction[] = null;

    reputationChain.networkNodes.forEach((node: any) => {
        console.log('Node: ', node);
        axios(`${node}/api/blockchain`).then(data => {
            console.log('Data from axios: ', data);
            res.status(201).json({ success: true, data: 'Working' });
            if (data.data.data.chain.length > maxLength) {
                maxLength = data.data.data.chain.length;
                longestChain = data.data.data.chain;
                pendingList = data.data.data.pendingList;   
            };

            if (
                !longestChain || (
                    longestChain && !reputationChain.calidateChain(
                        longestChain
                    )
                )
            ) {
               console.log('No replacement needed'); 
            } else {
                reputationChain.chain = longestChain;
                reputationChain.pendingList = pendingList;
                res.status(200).json({ success: true, data: reputationChain });
            };
        });
    });
});

app.get('/api/block/:hash', (req: Request, res: Response) => {
    const block: Block = reputationChain.findBlock(req.params.hash);
    if (!block) {
        res.status(404).json({
            status: 404, 
            success: false, 
            data: 'Block not found'
        });
    } else {
        res.status(200).json({ success: true, data: block });
    }
});

app.get('/api/transaction/:id', (req: Request, res: Response) => {
    const result: { 
        transaction: Transaction, block: Block 
    } = reputationChain.findTransaction(req.params.id);
    if (!result) {
        res.status(404).json({ 
            status: 404, 
            success: false, 
            message: 'Transaction not found'
        });
    } else {
        res.status(200).json({ success: true, data: result });
    }
});

app.get('/api/transactions/:address', (req: Request, res: Response) => {
    const result: { 
        balance: string, transactions: Transaction[] 
    } = reputationChain.listTransactions(req.params.address);
    res.status(200).json({success:true, data: result });
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));