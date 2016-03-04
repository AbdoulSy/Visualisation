
  var Errors =  {};

  Errors.DisplayError = require('./incl/display-error.js');

  Errors.AjaxError = require('./incl/ajax-error.js');

  Errors.HistoryError = require('./incl/history-error.js');

  Errors.GraphError = require('./incl/graph-error.js');

  Errors.DOMError = require('./incl/dom-error.js');

  module.exports = function ortErrorService() {
    return {
      ApplicationError: Errors.ApplicationError,
      DataError: Errors.DataError,
      DisplayError: Errors.DisplayError,
      AjaxError: Errors.AjaxError,
      HistoryError: Errors.HistoryError,
      GraphError: Errors.GraphError,
      DOMError: Errors.DOMError
    };
  };

