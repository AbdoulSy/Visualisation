  "use strict";
  var lang = require('../core/language.js');
  var historyError = function(message) {
    this.name = 'HistoryError';
    this.message = message || lang('UNKNOWN_EXCEPTION');
  };
  historyError.prototype = Object.create(Error);

  module.exports = historyError;
