import express from 'express';
import { 
    getBlockchain, 
    mineBlock, 
} from '../controllers/blockchain-controller.js';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine-block').get(mineBlock);

export default router;