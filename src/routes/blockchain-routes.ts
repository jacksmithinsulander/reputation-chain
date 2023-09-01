import express, { Request, Response } from 'express';
import getBlockchain from '../controllers/blockchain-controller.js';

const router = express.Router();

router.route('/').get();

export default router;