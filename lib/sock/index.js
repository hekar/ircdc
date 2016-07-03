'use strict';

const _ = require('lodash');
const config = require('../config');
const sockjs = require('sockjs');

function createSock() {
  const opt = {
    sockjs_url: config.sockjs.client.url
  };

  const listeners = {};
  const connections = [];
  const server = sockjs.createServer(opt);
  server.on('connection', function(conn) {
    connections.push(conn);
    server.fireAll('connection', conn);
    conn.on('data', function(message) {
      conn.write(message);
    });

    conn.on('close', function() {
      _.remove(connections, (n) => n === conn);
    });
  });

  server.sendAll = function(data) {
    connections.forEach((connection) => {
      connection.write(data);
    });
  };

  server.listenAll = function(type, callback) {
    if (!listeners[type]) {
      listeners[type] = [];
    }

    listeners[type].push(callback);
  };

  server.fireAll = function(type, data) {
    if (listeners[type]) {
      listeners[type].forEach((listener) => {
        listener(type, data);
      });
    }
  };

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
