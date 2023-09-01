import express from 'express';
import { getSocialCredit } from '../controllers/query-controller.js';

const router = express.Router();

router.route('/:address').get(getSocialCredit);

export default router;