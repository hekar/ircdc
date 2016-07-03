'use strict';

const rc = require('rc');

const config = rc('ircdc', {
  db: {
    host: 'localhost',
    port: 5432,
    database: 'public',
    user: 'postgres',
    password: 'postgres'
  }
});

const db = require('pg-promise')(config.db);

module.exports = {
  db,
  session: require('./session'),
  log: require('./log')
};
