const { validationResult } = require('express-validator');
const { UnprocessableEntityError } = require('@server/errors');

/**
 * Format error message
 * @param {string} msg
 * @return {string}
 */
const errorFormatter = ({ msg }) => msg;

/**
 * Check if current error is known
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {Function} next
 */
const validator = (req, res, next) => {
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    const [msg] = result.array({ onlyFirstError: true });
    return next(new UnprocessableEntityError(msg));
  }
  next();
};

module.exports = validator;
