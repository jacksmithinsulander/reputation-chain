import { Request, Response } from 'express';
import { reputationChain, Transaction } from '../utilities/starter.js';

export const getSocialCredit = (req: Request, res: Response) => {
    const result: { 
        socialCredit: string, transactions: Transaction[] 
    } = reputationChain.listTransactions(req.params.address);
    res.status(200).json({success:true, data: result.socialCredit });
}