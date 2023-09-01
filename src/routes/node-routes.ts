import express from 'express';
import { 
    addNode, 
    addNodes, 
    broadcastNode 
} from '../controllers/node-controller.js';

const router = express.Router();

router.route('/').post(broadcastNode);
router.route('/register-node').post(addNode);
router.route('/register-nodes').post(addNodes);

export default router;