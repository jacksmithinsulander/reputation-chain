import { Request, Response } from 'express';
//import { reputationChain } from '../utilities/starter.js';

export const listTransactions = (req: Request, res: Response) => {
    res.status(200).json({
        success: true, 
        data: `Here are the transactions for address: ${req.params.address}` 
    });
}
