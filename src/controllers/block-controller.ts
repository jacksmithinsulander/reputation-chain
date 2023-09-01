import { Request, Response } from 'express';
//import { reputationChain } from '../utilities/starter.js';

export const addBlock = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Block added'})
}

export const findBlock = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: `Block found ${req.params.hash}` });
}