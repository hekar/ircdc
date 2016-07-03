'use strict';

const config = require('../config');
const pgp = require('pg-promise')(config.db);

module.exports = {
  pgp,
  session: require('./session'),
  log: require('./log')
};
