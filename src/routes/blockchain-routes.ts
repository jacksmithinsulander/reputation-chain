import express from 'express';
import { 
    getBlockchain, 
    mineBlock, 
    addTransaction,
    broadcastTransaction,
    addBlock 
} from '../controllers/blockchain-controller.js';

const router = express.Router();

router.route('/').get(getBlockchain);
router.route('/mine-block').get(mineBlock);
router.route('/transaction').post(addTransaction);
router.route('/transaction/broadcast').post(broadcastTransaction);
router.route('/block').post(addBlock);

export default router;