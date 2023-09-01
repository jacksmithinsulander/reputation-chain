import { Request, Response } from 'express';

export const getBlockchain = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Its working' });
};

export const mineBlock = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Block is mined' });
};

export const addTransaction = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Transaction added' });
}