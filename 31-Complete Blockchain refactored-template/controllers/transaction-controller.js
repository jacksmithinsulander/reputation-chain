exports.addTransaction = (req, res) => {
  res.status(200).json({ success: true, data: 'Transaction added' });
};

exports.broadcastTransaction = (req, res) => {
  res.status(200).json({ success: true, data: 'Transaction broadcasted' });
};

exports.findTransaction = (req, res) => {
  res.status(200).json({ success: true, data: `Found the transaction with id: ${req.params.id}` });
};
