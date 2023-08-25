exports.addBlock = (req, res) => {
  res.status(200).json({ success: true, data: 'Block added' });
};

exports.findBlock = (req, res) => {
  res.status(200).json({ success: true, data: `Block found ${req.params.hash}` });
};
