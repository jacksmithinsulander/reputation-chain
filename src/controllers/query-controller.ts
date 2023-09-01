import { Request, Response } from 'express';
//import { reputationChain } from '../utilities/starter.js';

export const getSocialCredit = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Social credit is: '})
}