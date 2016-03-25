'use strict';

const co = require('co');
const db = require('../db');
const irc = require('../irc');
const logger = require('../logger');

const sessions = [];

function bootstrap(app, router, addons) {
  const sock = addons.sock;
  const archivedMessages = [];

  function archiveMessage(type, message) {
    archivedMessages.push({
      type,
      message
    });
  }

  function sendPayload(type, data) {
    const payload = { data };
    const msg = {
      type,
      payload
    };
    archiveMessage(msg);
    sock.sendAll(msg);
    logger.info(msg);
  }

  co(function* () {
    const ircSession = yield irc.session.connect({
      host: 'irc.freenode.net',
      nick: 'hekar',
      channels: ['​#bitcloud-dev']
    });

    sessions.push(ircSession);

    sock.listen('connection', () => {
      debugger;
      archivedMessages.forEach((message) => {
        sendPayload('open', message);
      });
    });

    const client = ircSession.client;
    client.addListener('registered', function(message) {
      sendPayload('registered', message);
    });

    client.addListener('motd', function(motd) {
      sendPayload('motd', { motd });
    });

    client.addListener('names', function(channel, nicks) {
      sendPayload('names', { channel, nicks });
    });

    client.addListener('topic', function(channel, topic, nick, message) {
      sendPayload('topic', { channel, topic, nick, message });
    });

    client.addListener('join', function(channel, nick, message) {
      sendPayload('join', { channel, nick, message });
    });

    client.addListener('part', function(channel, nick, reason, message) {
      sendPayload('part', { channel, nick, reason, message });
    });

    client.addListener('quit', function(nick, reason, channels, message) {
      sendPayload('quit', { nick, reason, channels, message });
    });

    client.addListener('kick', function(channel, nick, by, reason, message) {
      sendPayload('kick', { channel, nick, by, reason, message });
    });

    client.addListener('kill', function(nick, reason, channels, message) {
      sendPayload('kill', { nick, reason, channels, message });
    });

    client.addListener('message', function(from, to, message) {
      sendPayload('message', { from, to, message });
    });

    client.addListener('selfMessage', function(to, text) {
      sendPayload('selfMessage', { to, text });
    });

    client.addListener('notice', function(nick, to, text, message) {
      sendPayload('notice', { nick, to, text, message });
    });

    client.addListener('ping', function(server) {
      sendPayload('ping', { server });
    });

    client.addListener('pm', function(nick, text, message) {
      sendPayload('pm', { nick, text, message });
    });

    client.addListener('ctcp', function(from, to, text, type, message) {
      sendPayload('ctcp', { from, to, text, type, message });
    });

    client.addListener('ctcp-notice', function(from, to, text, message) {
      sendPayload('ctcp-notice', { from, to, text, message });
    });

    client.addListener('ctcp-privmsg', function(from, to, text, message) {
      sendPayload('ctcp-privmsg', { from, to, text, message });
    });

    client.addListener('ctcp-version', function(from, to, message) {
      sendPayload('ctcp-version', { from, to, message });
    });

    client.addListener('nick', function(oldnick, newnick, channels, message) {
      sendPayload('nick', { oldnick, newnick, channels, message });
    });

    client.addListener('invite', function(channel, from, message) {
      sendPayload('invite', { channel, from, message });
    });

    client.addListener('+mode', function(channel, by, mode, argument, message) {
      sendPayload('+mode', { channel, by, mode, argument, message });
    });

    client.addListener('-mode', function(channel, by, mode, argument, message) {
      sendPayload('-mode', { channel, by, mode, argument, message });
    });

    client.addListener('whois', function(info) {
      sendPayload('whois', { info });
    });

    client.addListener('error', function(message) {
        logger.error('error: ', message);
        sendPayload('error', message);
    });
  });
}

process.stdin.resume();

function exitHandler(options, err) {
  // TODO: Is it possible to fix this...

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
