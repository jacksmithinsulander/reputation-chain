import { Request, Response } from 'express';
import { reputationChain } from '../utilities/starter.js';
import axios from 'axios';

export const broadcastNode = async (req: Request, res: Response) => {
    const urlToAdd: string[] = req.body.nodeUrl;

    if (reputationChain.networkNodes.indexOf(urlToAdd) === -1) {
        reputationChain.networkNodes.push(urlToAdd);
    }

    const registerNodePromises = reputationChain.networkNodes.map(async (url: string) => {
        const body = { nodeUrl: urlToAdd };
        await axios.post(`${url}/api/register-node`, body, {
            headers: { 'Content-Type': 'application/json' }
        });
    });

    await Promise.all(registerNodePromises);

    const body = {
        nodes: [
            ...reputationChain.networkNodes, reputationChain.nodeUrl
        ]
    };

    await axios.post(`${urlToAdd}/api/v1/node/register-nodes`, body, {
        headers: {'Content-Type': 'application/json'}
    });

    res.status(201).json({success: true, data: 'New node added to network'});
};

export const addNode = (req: Request, res: Response) => {
    const url: string[] = req.body.nodeUrl;

    if (
        reputationChain.networkNodes.indexOf(url) === -1 && 
        reputationChain.nodeUrl !== url
    ) {
        reputationChain.networkNodes.push(url);
    };
    
    res.status(201).json({ success: true, data: 'New nodes added' });
};

export const addNodes = (req: Request, res: Response) => {
    const allNodes: string[] = req.body.nodes;
  
    allNodes.forEach((url) => {
        if (
            reputationChain.networkNodes.indexOf(url) === -1 &&
            reputationChain.nodeUrl !== url
        ) {
            reputationChain.networkNodes.push(url);
        }
    });  
    res.status(201).json({ success: true, data: 'Nya noder tillagda' });
};