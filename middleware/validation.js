const { ValidationError } = require('../utils/errors');

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    
    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      next(new ValidationError(message));
    }
    
    next();
  };
};

module.exports = {
  validateRequest
};