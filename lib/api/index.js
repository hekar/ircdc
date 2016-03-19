'use strict';

const session = require('./session');

function bootstrap(app, router, addons) {
  const passport = addons.passport;

  session(router, passport)
}

module.exports = {
  bootstrap
};
