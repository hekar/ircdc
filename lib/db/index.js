'use strict';

const config = require('../config');
const db = require('pg-promise')(config.db);

module.exports = {
  db,
  session: require('./session'),
  log: require('./log')
};
