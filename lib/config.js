const rc = require('rc');

module.exports = rc('ircdc', {
  pg: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    schema: 'public'
  },
  koa: {
    host: 'localhost',
    port: 5001
  },
  kafka: {
  },
  sockjs: {
    client: {
      url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js'
    }
  }
});
