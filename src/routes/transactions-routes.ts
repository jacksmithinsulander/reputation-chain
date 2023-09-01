import express from 'express';
import { listTransactions } from '../controllers/transactions-controller.js';

const router = express.Router();

router.route('/:address').get(listTransactions);

export default router;