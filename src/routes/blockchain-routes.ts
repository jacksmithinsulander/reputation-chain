import express, { Request, Response } from 'express';

const router = express.Router();

router.route('/').get();

export default router;