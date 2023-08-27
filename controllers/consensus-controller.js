exports.synchronize = (req, res) => {
  res.status(200).json({ success: true, data: 'Nodes are synchronized' });
};
