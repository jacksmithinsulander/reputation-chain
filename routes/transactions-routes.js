const express = require('express');
const router = express.Router();
const { listTransactions } = require('../controllers/transactions-controller');

router.route('/:address').get(listTransactions);

module.exports = router;
