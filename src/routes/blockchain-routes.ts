import express, { Request, Response } from 'express';
import { 
    getBlockchain, 
    mineBlock, 
    addTransaction 
} from '../controllers/blockchain-controller.js';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine-block').get(mineBlock);
router.route('/transaction').post(addTransaction);

export default router;