'use strict';

const config = require('./config.js');

const koa = require('koa');
const http = require('http');
const sock = require('./sock');
const routes = require('./routes');
const logger = require('./logger');

const bodyParser = require('koa-bodyparser');

const app = koa();

exports.app = app;

// trust proxy
app.proxy = true;

// body parser
app.use(bodyParser());

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

const sockjsInstance = sock.createSock();

routes.bootstrap(app, {
  sock: sockjsInstance
});

logger.info(`${config.koa.name} is now listening on port ${config.koa.port}`);

const server = http.createServer(app.callback());
sock.register(server, sockjsInstance);

server.listen(config.koa.port, '0.0.0.0');

process.on('SIGINT', function() {
  process.exit();
});
