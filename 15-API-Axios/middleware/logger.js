// Create a customized middleware...
const logger = (req, res, next) => {
  req.logger = 'Logging Middleware';
  console.log(
    `${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`
  );

  next();
};

module.exports = logger;
