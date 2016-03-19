
const irc = require('irc');

function connect(params) {
  const host = params.host;
  const nick = params.nick;
  const client = new irc.Client(host, nick, {
    channels: params.channels,
  });

  return client;
}

module.exports = {
  connect
};
