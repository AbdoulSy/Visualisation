  "use strict";
  var lang = require('../core/language.js');
  var appError = function(message) {
    this.name = 'ApplicationError';
    this.message = message || lang('UNKNOWN_EXCEPTION');
  };
  appError.prototype = Object.create(Error);

  module.exports = appError;
