'use strict';

const _ = require('lodash');
const bluebird = require('bluebird');
const kafka = require('kafka-node');
const logger = require('../../logger');

const client = new kafka.Client();

function* connect(producer) {
  yield producer.onAsync('ready');

  try {
    const topics = ['topic1', 'topic2'];
    yield producer.createTopicsAsync(topics, true);
  } catch (e) {
    // Topics already exist?
    logger.error(e);
  }

  producer.on('error', (err) => {
    console.error(err);
  });

  return {
    send: producer.sendAsync
  };
}

const producer = bluebird.promisifyAll(
  new kafka.Producer(client));
module.exports = _.partial(connect, producer);
