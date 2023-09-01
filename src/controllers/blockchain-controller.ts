import { Request, Response } from 'express';
import { reputationChain } from '../utilities/starter.js';

export const getBlockchain = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: reputationChain });
};

export const mineBlock = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Block is mined' });
};

export const addTransaction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Transaction added' });
};

export const broadcastTransaction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Transaction broadcasted'});
};

export const addBlock = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Block added'})
}