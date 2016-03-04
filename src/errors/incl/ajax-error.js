  "use strict";
  var lang = require('../core/language.js');
  var ajaxError = function(message) {
    this.name = 'AjaxError';
    this.message = message || lang('UNKNOWN_EXCEPTION');
  };
  ajaxError.prototype = Object.create(Error);

  module.exports = ajaxError;
