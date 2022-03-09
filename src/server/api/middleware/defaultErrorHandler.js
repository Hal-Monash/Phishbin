const { logger } = require('@server/utils/logger');

/**
 * Define a default error handler.
 * @param {Error} err
 * @param {e.Request} req
 * @param {e.Response} res
 * @param next
 */
const defaultErrorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { status, message } = err;
  if (typeof status === 'undefined') {
    logger.error(err);
    res.status(500).json({ error: message });
  } else {
    logger.error(err);
    res.status(status).json({ error: message });
  }
};

module.exports = defaultErrorHandler;
