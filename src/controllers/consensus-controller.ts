import { Request, Response } from 'express';
import { reputationChain, Transaction } from '../utilities/starter.js';
import axios from 'axios';

export const syncronize = (req: Request, res: Response) => {
    const currentChainLength: number = reputationChain.chain.length;
    let maxLength: number = currentChainLength;
    let longestChain = null;
    let pendingList: Transaction[] = null;

    reputationChain.networkNodes.forEach((node: any) => {
        console.log('Node: ', node);
        axios(`${node}/api/blockchain`).then(data => {
            console.log('Data from axios: ', data);
            res.status(201).json({ success: true, data: 'Working' });
            if (data.data.data.chain.length > maxLength) {
                maxLength = data.data.data.chain.length;
                longestChain = data.data.data.chain;
                pendingList = data.data.data.pendingList;   
            };

            if (!longestChain || (
                longestChain && !reputationChain.calidateChain(
                    longestChain
                )
            )) {
               console.log('No replacement needed'); 
            } else {
                reputationChain.chain = longestChain;
                reputationChain.pendingList = pendingList;
                res.status(200).json({ success: true, data: reputationChain });
            };
        });
    });
};