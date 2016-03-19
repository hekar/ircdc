'use strict';

var sockjs  = require('sockjs');
var path    = require('path');

function bootstrap(app, router, addons) {
  var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};
  var sockjs_echo = sockjs.createServer(sockjs_opts);
  sockjs_echo.on('connection', function(conn) {
    conn.on('data', function(message) {
      conn.write(message);
    });
  });

  console.log(app.callback)
  //sockjs_echo.installHandlers(app.callback());
}

module.exports = {
  bootstrap
};
