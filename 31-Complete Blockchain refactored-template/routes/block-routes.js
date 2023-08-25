const express = require('express');
const router = express.Router();
const { addBlock, findBlock } = require('../controllers/block-controller');

router.route('/:hash').get(findBlock);
router.route('/').post(addBlock);

module.exports = router;
