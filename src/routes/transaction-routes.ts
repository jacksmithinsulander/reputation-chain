import express from 'express';
import { 
    addTransaction,
    broadcastTransaction,
    findTransaction 
} from '../controllers/transaction-controller.js';

const router = express.Router();

router.route('/:id').get(findTransaction);
router.route('/').post(addTransaction);
router.route('/broadcast').post(broadcastTransaction);