const { softCoin } = require('../utilities/config');

exports.broadcastNode = (req, res) => {
  res.status(201).json({ success: true, data: `Node is broadcasted ${req.body.nodeUrl}` });
};
exports.addNode = (req, res) => {
  res.status(201).json({ success: true, data: `Node ${req.body.nodeUrl} is added` });
};
exports.addNodes = (req, res) => {
  res.status(201).json({ success: true, data: 'Nodes are added' });
};
