const { NAMESPACE } = require('./constants');

/** Default logger for plugin. */
const logger = require('debug')(NAMESPACE);

module.exports = {
  log: logger,
};
