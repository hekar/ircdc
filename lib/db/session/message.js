'use strict';

const _ = require('lodash');
const dao = require('../misc/dao');

const archivedMessages = [];

function append(message) {
    console.log(message);
    archivedMessages.push(message);
}

module.exports = _.assign({
    archivedMessages,
    append
}, dao.create('message'));
