const logger = require('../utils/logger');
const { BaseError, AuthenticationError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  if (err instanceof AuthenticationError) {
    return res.status(401).json({
      status: 'error',
      message: err.message
    });
  }

  // Default error
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

module.exports = {
  errorHandler
};