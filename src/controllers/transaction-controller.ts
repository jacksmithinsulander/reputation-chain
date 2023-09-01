import { Request, Response } from 'express';
//import { reputationChain } from '../utilities/starter.js';

export const addTransaction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Transaction added' });
};

export const broadcastTransaction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Transaction broadcasted'});
};

export const findTransaction = (req: Request, res: Response) => {
    res.status(200).json({ 
        success: true, data: `Found the transaction with id: ${req.params.id}`
    });
};