const winston = require('winston');
const { printf, timestamp } = winston.format;
const morgan = require('morgan');
const prettyjson = require('prettyjson');
const { isEmpty } = require('lodash');

const customFormat = printf(info => {
  return info.stack ? `${info.timestamp} [${info.level}]: ${info.stack}` : `${info.timestamp} [${info.level}]: ${info.message}`;
});

const upperCaseLevel = logEntry => {
  logEntry.level = logEntry.level.toUpperCase();
  return logEntry;
};

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    client: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    debug: 'grey',
    error: 'red',
    info: 'blue',
    client: 'cyan',
    warn: 'yellow',
  },
};
winston.addColors(customLevels.colors);

const logger = winston.createLogger({
  levels: customLevels.levels,
  format: winston.format.combine(winston.format(upperCaseLevel)(), winston.format.colorize(), timestamp(), customFormat),
  transports: [
    new winston.transports.Console({
      colorize: true,
      level: process.env.LOG_LEVEL || 'info',
      prettyPrint: true,
      silent: process.env.NODE_ENV === 'test', // disable logger while unit testing
      timestamp: true,
    }),
  ],
});

logger.stream = {
  write: message => {
    // remove \n tail
    if (message[message.length - 1] === '\n') {
      message = message.substring(0, message.length - 1);
    }
    logger.info(message);
  },
};

const options = {
  defaultIndentation: 2,
  inlineArrays: 1,
  keysColor: 'magenta',
  noColor: false,
  numberColor: 'magenta',
};

morgan.token('body', req => {
  const { body } = req;
  if (isEmpty(body)) {
    return '-';
  }
  try {
    return `\n${prettyjson.render(req.body, options, 33)}`;
  } catch (err) {
    return '-';
  }
});

module.exports = {
  logger,
  morgan,
};
