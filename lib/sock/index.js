'use strict';

const _ = require('lodash');
const sockjs = require('sockjs');

function createSock() {
  const opt = {
    sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"
  };

  const listeners = {};
  const connections = [];
  const server = sockjs.createServer(opt);
  server.on('connection', function(conn) {
    connections.push(conn);
    fire('connection', conn);
    conn.on('data', function(message) {
      conn.write(message);
    });

    conn.on('close', function() {
      _.remove(connections, (n) => n === conn);
    });
  });

  server.sendAll = function(data) {
    console.log('send', data);
    connections.forEach((connection) => {
      connection.write(data);
    });
  }

  return server;
}

function register(server, sock) {
  const options = {
    prefix: '/socket'
  };

  sock = sock || createSock();

  return sock.installHandlers(server, options);
}


module.exports = {
  createSock,
  register,
};
