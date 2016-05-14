'use strict';

const winston = require('winston');

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  verbose: 3,
  debug: 4,
  silly: 5
};

const logger = new(winston.Logger)({
  transports: [
    new(winston.transports.Console)({
      level: 'error'
    }),
    new(winston.transports.File)({
      filename: 'somefile.log',
      level: 'info'
    })
  ]
});

logger.setLevels(levels);

module.exports = logger;
