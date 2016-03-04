  "use strict";
  var lang = require('../core/language.js');
  var domError = function(message) {
    this.name = 'DOMError';
    this.message = message || lang('UNKNOWN_EXCEPTION');
  };
  domError.prototype = Object.create(Error);

  module.exports = domError;
