'use strict';

const _ = require('lodash');
const dao = require('../misc/dao');
const message = require('./message');

module.exports = _.assign({
  message
}, dao.create('session'));
