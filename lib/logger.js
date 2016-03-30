'use strict';

const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: "ircdc",
  level: 'debug',
  serializers: bunyan.stdSerializers
});
