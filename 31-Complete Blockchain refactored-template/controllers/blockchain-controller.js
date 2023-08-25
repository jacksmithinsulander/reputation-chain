const { softCoin } = require('../utilities/config');

exports.getBlockchain = (req, res) => {
  res.status(200).json({ success: true, data: softCoin });
};

exports.mineBlock = (req, res) => {
  res.status(200).json({ success: true, data: 'Block is mined' });
};
