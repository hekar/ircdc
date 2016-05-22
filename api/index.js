'use strict';

function bootstrap(app, router, addons) {
  const passport = addons.passport;

  router.get('/api/messages', function() {
  });

  router.post('/api/say', function() {
    const from = this.params.from;
    const to = this.params.to;
    const message = this.params.message;

    debugger;
  });
}

module.exports = {
  bootstrap
};
