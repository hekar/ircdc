'use strict';

const co = require('co');
const db = require('../db');
const irc = require('../irc');

const sessions = [];

function bootstrap(app, router, addons) {
  return;
  co(function* () {
    const ircSession = yield irc.session.connect({
      host: 'irc.freenode.net',
      nick: 'hekar',
      channels: ['​#bitcloud-dev']
    });

    sessions.push(ircSession);

    const client = ircSession.client;
    client.addListener('message', function (from, to, message) {
      logger.info(from + ' => ' + to + ': ' + message);
    });

    client.addListener('error', function(message) {
        logger.error('error: ', message);
    });
  });
}

process.stdin.resume();

function exitHandler(options, err) {
  sessions.forEach((session) => {
      console.log('disconnecting from session');
      session.client.disconnect('', function() {
        console.log('successfully disconnected');
      });
  });

  if (options.cleanup) {
    console.log('clean');
  }

  if (err) {
    console.log(err.stack);
  }

  if (options.exit) {
    // HACK: Fix this... Ehhh.
    setTimeout(process.exit, 1500);
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null,{cleanup:true}));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, {exit:true}));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

module.exports = {
  bootstrap
};
