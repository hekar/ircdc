const rc = require('rc');

module.exports = rc('ircdc', {
  pg: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'ircdc',
    schema: 'public'
  },
  koa: {
    name: 'ircdc',
    host: 'localhost',
    port: 9071
  },
  sockjs: {
    client: {
      url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
    }
  }
});
