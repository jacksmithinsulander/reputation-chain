import express from 'express';
import { addBlock } from '../controllers/block-controller.js';

const router = express.Router();

router.route('/block').post(addBlock);

export default router;