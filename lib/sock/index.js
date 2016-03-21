'use strict';

var sockjs = require('sockjs');

function createSockServer() {
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

function register(server) {
  const options = {
    prefix: '/socket'
  };

  return createSockServer()
    .installHandlers(server, options);
}

module.exports = {
  createSockServer,
  register
};
