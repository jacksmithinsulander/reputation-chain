import { Request, Response } from 'express';
import { reputationChain, Block, Transaction } from '../utilities/starter.js';
import axios from 'axios';

export const addTransaction = (req: Request, res: Response) => {
    const transaction: Transaction = req.body;
    const index: Block = reputationChain.
        addTransactionToPendingList(transaction);
    res.status(201).json({success: true, data: index});
};

export const broadcastTransaction = (req: Request, res: Response) => {
    if (req.body.rating <= 10) {
        const transaction: Transaction = reputationChain.addTransaction(
            req.body.rating, req.body.sender, req.body.recipient
        );
        reputationChain.addTransactionToPendingList(transaction);
        reputationChain.networkNodes.forEach(async(url) => {
            await axios.post(`${url}/api/transaction`, transaction);
        });
        res.status(201).json({
            success: true, 
            data: 'Transaction added to mempool'
        });
    } else {
        res.status(404).json({
            status: 404,
            success: false, 
            data: 'Not a valid ratingnumber'
        })
    }
};

export const findTransaction = (req: Request, res: Response) => {
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
};