'use strict';

const kafka = require('kafka-node');

const client = new kafka.Client();

const consumer = new kafka.Consumer(
  client, [
    { topic: 'topic1', partition: 0 },
    { topic: 'topic2', partition: 0 }
  ], {
    autoCommit: false
  }
);

consumer.on('message', function (message) {
    console.log('Received', message.value);
});
