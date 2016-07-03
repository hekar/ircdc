'use strict';

/* eslint-disable */

/**
 * function - Append line to message log for
 *  Composite key (session, channel)
 *
 * @param  {number} session   session id
 * @param  {string} channel channel name (#channel)
 * @param  {number} timestamp message timestamp
 * @param  {string} owner     owner name
 * @param  {string} message   message text
 * @returns {any}           description
 */
function* append(session, channel,
  timestamp, owner, message) {
  throw new Error('not implemented');
}


/**
 * recite - Fetch message log
 *  Composite key (session, channel)
 *
 * @param  {number} session Postgres session id
 * @param  {string} channel #channel
 * @returns {type}         description
 */
function recite(session, channel) {
  throw new Error('not implemented');
}

module.exports = {
  append,
  recite
};

/* eslint-enable */
