  "use strict";
  var lang = require('../core/language.js');
  var displayError = function(message) {
    this.name = 'DisplayError';
    this.message = message || lang('UNKNOWN_EXCEPTION');
  };
  displayError.prototype = Object.create(Error);

  module.exports = displayError;
