'use strict';

const producer = require('producer')();

function* enqueue(topic, messages) {
  const payloads = [
    { topic, messages, partition: 0 }
  ];

  yield producer.send(payloads);
}

module.exports = {
  enqueue
};
