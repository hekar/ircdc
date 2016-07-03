'use strict';

const session = require('./session');

function bootstrap(app, router, addons) {
  session(router, addons);
}

module.exports = {
  bootstrap
};
