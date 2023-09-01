import { Request, Response } from 'express';
//import { reputationChain } from '../utilities/starter.js';

export const broadcastNode = (req: Request, res: Response) => {
    res.status(201).json({ success: true, data: `Node is broadcasted ${req.body.nodeUrl}` });
}

export const addNode = (req: Request, res: Response) => {
    res.status(201).json({ success: true, data: `Node ${req.body.nodeUrl} is added` });
}

export const addNodes = (req: Request, res: Response) => {
    res.status(200).json({ success: true, data: 'Nodes added'})
}