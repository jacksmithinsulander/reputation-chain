import express from 'express';
import { syncronize } from '../controllers/consensus-controller.js';

const router = express.Router();

router.route('/').get(syncronize);

export default router;