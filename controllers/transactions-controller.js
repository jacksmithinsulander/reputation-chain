exports.listTransactions = (req, res) => {
  res.status(200).json({ success: true, data: `Here are the transactions for address: ${req.params.address}` });
};
