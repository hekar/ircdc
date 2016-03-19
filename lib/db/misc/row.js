'use strict';

const _ = require('lodash');

function hasRows(result) {
  return result.rows && result.rows.length > 0;
}

function first(result) {
  return (hasRows(result)) ?
    _.first(result.rows) : undefined;
}

function json(field, result) {
  return (hasRows(result)) ?
    result.rows.map((row) => JSON.parse(row[field])) : [];
}

module.exports = {
  hasRows,
  first,
  json
};
