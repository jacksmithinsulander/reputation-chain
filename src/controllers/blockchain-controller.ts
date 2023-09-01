import { Request, Response } from 'express';
import { reputationChain, Block, Transaction } from '../utilities/starter.js';
import axios from 'axios';

export const getBlockchain = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: reputationChain });
};

export const mineBlock = async (req: Request, res: Response) => {
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
};
