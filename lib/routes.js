'use strict';

const Router = require('koa-router');
const logger = require('./logger');
const api = require('./api');
const daemon = require('./daemon');

const routes = new Router();

function bootstrap(app, addons) {
  app.use(routes.middleware());

  const childAddons = Object.assign({}, addons);

  [api, daemon].forEach((server) => {
    try {
      server.bootstrap(app, routes, childAddons);
    } catch (e) {
      logger.error(e, 'Failure to bootstrap server: ', server);
    }
  });
}

module.exports = {
  bootstrap
};
