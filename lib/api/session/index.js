'use strict';

module.exports = function(router) {
  router.get('/api/messages/:session/:channel/:since/', function() {
  });

  router.post('/api/say', function() {
    const params = this.request.body;
    const from = params.from;
    const to = params.to;
    const message = params.message;

    console.log('say', from, to, 'message:', message);
    this.status = 200;
    this.body = {};
  });
};
