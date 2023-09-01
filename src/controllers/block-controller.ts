import { Request, Response } from 'express';
import { reputationChain, Block, Transaction } from '../utilities/starter.js';

export const addBlock = (req: Request, res: Response) => {
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
};

export const findBlock = (req: Request, res: Response) => {
    const block: Block = reputationChain.findBlock(req.params.hash);
    if (!block) {
        res.status(404).json({
            status: 404, 
            success: false, 
            data: 'Block not found'
        });
    } else {
        res.status(200).json({ success: true, data: block });
    };
};