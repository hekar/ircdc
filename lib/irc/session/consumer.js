'use strict';

const _ = require('lodash');
const async = require('async');
const kafka = require('kafka-node');

const client = new kafka.Client();

const producer = new kafka.Producer(client);
producer.on('ready', function () {
  producer.createTopics([
    'topic1', 'topic2'
  ], true, function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('Create Topics:', data);
    }
  });

  const km = new kafka.KeyedMessage('key', 'message');
  const payloads = [
    { topic: 'topic1', messages: 'hi', partition: 0 },
    { topic: 'topic2', messages: ['hello', 'world', km] }
  ];

  const arr = _.range(0, 1000000);
  const limit = 50;
  async.eachLimit(arr, limit, (i, callback) => {
    producer.send(payloads, function (err, data) {
      if (err) {
        console.error(err);
      } else {
        console.log(data);
      }

      callback();
    });
  });

  producer.on('error', function (err) {
    console.error(err);
  });
});
