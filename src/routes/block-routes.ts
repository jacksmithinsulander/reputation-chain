import express from 'express';
import { addBlock, findBlock } from '../controllers/block-controller.js';

const router = express.Router();

router.route('/:hash').get(findBlock);
router.route('/').post(addBlock);

export default router;