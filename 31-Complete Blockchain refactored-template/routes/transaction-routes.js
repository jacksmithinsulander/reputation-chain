const express = require('express');
const router = express.Router();

const { addTransaction, broadcastTransaction, findTransaction } = require('../controllers/transaction-controller');

router.route('/:id').get(findTransaction);
router.route('/').post(addTransaction);
router.route('/broadcast').post(broadcastTransaction);

module.exports = router;
