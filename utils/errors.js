class BaseError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationError extends BaseError {
  constructor(message) {
    super(message, 401);
  }
}

class ValidationError extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = {
  BaseError,
  AuthenticationError,
  ValidationError
};