'use strict';

function bootstrap(app, router, addons) {
  const passport = addons.passport;

  router.get('/api/messages', function() {
  });
}

module.exports = {
  bootstrap
};
