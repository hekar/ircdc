'use strict';

const pgp = require('pg-promise');

const cn = {
    host: 'localhost', // server name or IP address;
    port: 5432,
    database: 'public',
    user: 'postgres',
    password: 'postgres'
};

function* connect() {
  return db = pgp(cn);
};

module.exports = {
  connect,
  session: require('./session'),
  log: require('./log')
};
