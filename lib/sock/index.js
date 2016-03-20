'use strict';

var sockjs = require('sockjs');

function bootstrap(app) {
  const opt = {
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
  };

  const server = sockjs.createServer(opt);
  server.on('connection', function(conn) {
    conn.on('data', function(message) {
      conn.write(message);
    });
  });

  return server;
}

function register(app, callback) {
  return bootstrap(app)
    .installHandlers(app.callback());
}

module.exports = {
  bootstrap,
  register
};
